from decimal import Decimal

import razorpay

from django.conf import settings

from rest_framework import generics

from rest_framework.permissions import (
    IsAuthenticated
)

from rest_framework.response import Response

from rest_framework.views import APIView

from .serializers import (
    OrderSerializer,
    OrderItemSerializer
)

from .models import (
    Order,
    OrderItem
)

from cart.models import CartItem


# =========================================
# CREATE PAYMENT ORDER
# =========================================

class CreatePaymentView(
    APIView
):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        user = request.user

        cart_items = CartItem.objects.filter(
            user=user
        )

        if not cart_items.exists():

            return Response({

                "error": "Cart is empty"

            }, status=400)

        total = Decimal('0.00')

        for item in cart_items:

            total += (

                item.product.price *

                item.quantity
            )

        # Razorpay uses paise
        amount = int(total * 100)

        client = razorpay.Client(

            auth=(

                settings.RAZORPAY_KEY_ID,

                settings.RAZORPAY_KEY_SECRET
            )
        )

        payment = client.order.create({

            "amount": amount,

            "currency": "INR",

            "payment_capture": 1
        })

        return Response({

            "payment": payment,

            "key": settings.RAZORPAY_KEY_ID
        })


# =========================================
# VERIFY PAYMENT + CREATE ORDER
# =========================================

class VerifyPaymentView(
    APIView
):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        user = request.user

        razorpay_payment_id = request.data.get(
            "razorpay_payment_id"
        )

        razorpay_order_id = request.data.get(
            "razorpay_order_id"
        )

        razorpay_signature = request.data.get(
            "razorpay_signature"
        )

        cart_items = CartItem.objects.filter(
            user=user
        )

        if not cart_items.exists():

            return Response({

                "error": "Cart is empty"

            }, status=400)

        # CREATE ORDER
        order = Order.objects.create(

            user=user,

            total_price=0
        )

        total = Decimal('0.00')

        # CREATE ORDER ITEMS
        for item in cart_items:

            OrderItem.objects.create(

                order=order,

                product=item.product,

                vendor=item.product.vendor,

                quantity=item.quantity,

                price=item.product.price
            )

            total += (

                item.product.price *

                item.quantity
            )

        order.total_price = total

        order.save()

        # CLEAR CART
        cart_items.delete()

        return Response({

            "message": "Payment successful",

            "order_id": order.id,

            "total_price": total,

            "payment": {

                "razorpay_payment_id":
                    razorpay_payment_id,

                "razorpay_order_id":
                    razorpay_order_id,

                "razorpay_signature":
                    razorpay_signature,
            }
        })


# =========================================
# USER ORDERS
# =========================================

class UserOrdersView(
    generics.ListAPIView
):

    serializer_class = OrderSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Order.objects.filter(

            user=self.request.user

        ).order_by('-created_at')


# =========================================
# VENDOR ORDERS
# =========================================

class VendorOrdersView(
    generics.ListAPIView
):

    serializer_class = OrderItemSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        user = self.request.user

        if not hasattr(user, 'vendor'):

            return OrderItem.objects.none()

        return OrderItem.objects.filter(

            vendor=user.vendor

        ).order_by('-id')


# =========================================
# UPDATE ORDER STATUS
# =========================================

class UpdateOrderStatusView(
    APIView
):

    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):

        user = request.user

        try:

            item = OrderItem.objects.get(

                id=pk,

                vendor=user.vendor
            )

        except OrderItem.DoesNotExist:

            return Response({

                "error": "Order item not found"

            }, status=404)

        status_value = request.data.get(
            'status'
        )

        item.status = status_value

        item.save()

        return Response({

            "message": "Status updated"
        })