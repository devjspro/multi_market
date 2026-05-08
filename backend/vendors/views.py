from rest_framework import generics
from .models import Vendor
from .serializers import VendorSerializer

class VendorCreateView(generics.CreateAPIView):
    serializer_class = VendorSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)