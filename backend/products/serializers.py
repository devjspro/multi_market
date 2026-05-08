from rest_framework import serializers
from .models import Product
import os

class ProductSerializer(serializers.ModelSerializer):
    # Accept image input
    image = serializers.ImageField(required=False)

    # Output full URL
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'description',
            'price',
            'stock',
            'image',       # for upload
            'image_url'    # for display
        ]

    def get_image_url(self, obj):
        if not obj.image:
            return None

        if hasattr(obj.image, 'url'):
            return obj.image.url

        return f"https://res.cloudinary.com/{os.getenv('CLOUD_NAME')}/{obj.image}"