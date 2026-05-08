from rest_framework import serializers

from .models import CartItem
from products.models import Product


class CartSerializer(
    serializers.ModelSerializer
):

    product_name = serializers.CharField(
        source='product.name',
        read_only=True
    )

    product_price = serializers.DecimalField(
        source='product.price',
        max_digits=10,
        decimal_places=2,
        read_only=True
    )

    product_image = serializers.SerializerMethodField()

    class Meta:

        model = CartItem

        fields = [

            'id',

            'product',

            'product_name',

            'product_price',

            'product_image',

            'quantity',
        ]

    def get_product_image(self, obj):

        try:
            return obj.product.image.url

        except:
            return None