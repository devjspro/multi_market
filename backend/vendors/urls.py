from django.urls import path
from .views import VendorCreateView

urlpatterns = [
    path('create/', VendorCreateView.as_view()),
]