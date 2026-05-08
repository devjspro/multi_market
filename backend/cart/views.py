from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import CartItem
from .serializers import CartSerializer


class CartViewSet(ModelViewSet):

    serializer_class = CartSerializer

    permission_classes = [IsAuthenticated]

    queryset = CartItem.objects.all()

    # USER CART ONLY
    def get_queryset(self):

        return CartItem.objects.filter(
            user=self.request.user
        )

    # ADD TO CART
    def perform_create(self, serializer):

        product = serializer.validated_data[
            'product'
        ]

        quantity = int(

            serializer.validated_data.get(
                'quantity',
                1
            )
        )

        cart_item, created = CartItem.objects.get_or_create(

            user=self.request.user,

            product=product,

            defaults={
                'quantity': quantity
            }
        )

        # already exists
        if not created:

            cart_item.quantity += quantity

            cart_item.save()

    # DELETE SINGLE ITEM
    def destroy(self, request, *args, **kwargs):

        item = self.get_object()

        item.delete()

        return Response({

            "message": "Item removed"
        })

    # CLEAR CART
    @action(
        detail=False,
        methods=['delete']
    )
    def clear(self, request):

        CartItem.objects.filter(

            user=request.user

        ).delete()

        return Response({

            "message": "Cart cleared"
        })

    # DECREASE QUANTITY
    @action(
        detail=True,
        methods=['patch']
    )
    def decrease(self, request, pk=None):

        item = self.get_object()

        if item.quantity > 1:

            item.quantity -= 1

            item.save()

        else:

            item.delete()

        return Response({

            "message": "Quantity updated"
        })