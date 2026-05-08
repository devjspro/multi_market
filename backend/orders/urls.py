from django.urls import path

from .views import (

    CreatePaymentView,

    VerifyPaymentView,

    UserOrdersView,

    VendorOrdersView,

    UpdateOrderStatusView,
)

urlpatterns = [

    # PAYMENT
    path(
        'payment/create/',
        CreatePaymentView.as_view()
    ),

    path(
        'payment/verify/',
        VerifyPaymentView.as_view()
    ),

    # USER ORDERS
    path(
        '',
        UserOrdersView.as_view()
    ),

    # VENDOR
    path(
        'vendor/',
        VendorOrdersView.as_view()
    ),

    path(
        'vendor/<int:pk>/status/',
        UpdateOrderStatusView.as_view()
    ),
]