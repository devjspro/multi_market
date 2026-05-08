from rest_framework import serializers

from .models import Order
from .models import OrderItem


class OrderItemSerializer(
    serializers.ModelSerializer
):

    product_name = serializers.CharField(
        source='product.name',
        read_only=True
    )

    product_image = serializers.SerializerMethodField()

    class Meta:

        model = OrderItem

        fields = [

            'id',

            'product',

            'product_name',

            'product_image',

            'quantity',

            'price',

            'status'
        ]

    def get_product_image(self, obj):

        try:
            return obj.product.image.url

        except:
            return None


class OrderSerializer(
    serializers.ModelSerializer
):

    items = OrderItemSerializer(
        many=True,
        read_only=True
    )

    class Meta:

        model = Order

        fields = [

            'id',

            'total_price',

            'created_at',

            'items',
        ]