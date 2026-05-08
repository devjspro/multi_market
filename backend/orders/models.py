from django.db import models
from django.conf import settings

from products.models import Product
from vendors.models import Vendor

User = settings.AUTH_USER_MODEL


class Order(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    total_price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):

        return f"Order {self.id}"


class OrderItem(models.Model):

    STATUS_CHOICES = [

        ('pending', 'Pending'),

        ('processing', 'Processing'),

        ('shipped', 'Shipped'),

        ('delivered', 'Delivered'),

        ('cancelled', 'Cancelled'),
    ]
    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name='items'
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='order_items'
    )

    vendor = models.ForeignKey(
        Vendor,
        on_delete=models.CASCADE
    )

    quantity = models.IntegerField()

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    status = models.CharField(

        max_length=20,

        choices=STATUS_CHOICES,

        default='pending'
    )