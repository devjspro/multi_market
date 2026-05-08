from rest_framework import serializers
from .models import User
from vendors.models import Vendor
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True
    )

    class Meta:

        model = User

        fields = [
            'id',
            'username',
            'email',
            'password',
            'is_vendor',
        ]

    def create(self, validated_data):

        is_vendor = validated_data.pop(
            'is_vendor',
            False
        )

        # CREATE USER
        user = User.objects.create_user(

            username=validated_data['username'],

            email=validated_data['email'],

            password=validated_data['password'],
        )

        # UPDATE USER
        user.is_vendor = is_vendor
        user.save()

        # CREATE VENDOR PROFILE
        if is_vendor:

            Vendor.objects.create(

                user=user,

                store_name=f"{user.username}'s Store"
            )

        return user
        



class CustomTokenSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # Add user info to response
        data['user'] = {
            "id": self.user.id,
            "username": self.user.username,
            "is_vendor": self.user.is_vendor   # since you already have this field
        }

        return data
    
