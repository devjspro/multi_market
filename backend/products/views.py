from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import ValidationError

from .models import Product
from .serializers import ProductSerializer
from .permissions import IsVendor


class ProductViewSet(ModelViewSet):

    queryset = Product.objects.all()

    serializer_class = ProductSerializer

    # Permissions
    def get_permissions(self):

        if self.action in ['list', 'retrieve']:
            return [AllowAny()]

        return [IsVendor()]

    # Queryset
    def get_queryset(self):

        user = self.request.user

        # Vendor products only
        if (
            user.is_authenticated
            and user.is_vendor
            and self.request.query_params.get("mine") == "true"
        ):

            if hasattr(user, "vendor"):

                return Product.objects.filter(
                    vendor=user.vendor
                )

            return Product.objects.none()

        # Public products
        return Product.objects.all()

    # Create product
    def perform_create(self, serializer):

        user = self.request.user

        # Safety check
        if not hasattr(user, "vendor"):

            raise ValidationError(
                {"error": "Vendor profile not found"}
            )

        serializer.save(
            vendor=user.vendor
        )



