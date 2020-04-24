from rest_framework import serializers
from django.contrib.auth.models import User
import django.contrib.auth.password_validation as validations
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError
from .models import Sneaker, Plan

class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    def validate(self, data):

        password = data.pop('password')
        password_confirmation = data.pop('password_confirmation')

        if password != password_confirmation:
            raise serializers.ValidationError({'password_confirmation': 'Passwords do not match'})

        try:
            validations.validate_password(password=password)
        except ValidationError as err:
            raise serializers.ValidationError({'password': err.messages})

        data['password'] = make_password(password)
        return data

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password_confirmation', 'image', 'sneakers',)


class SneakerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sneaker
        fields = ('id', 'image', 'product_code', 'brand', 'model_name', 'sneaker_type', 'date_added', 'date_of_last_use', 'user', 'release', 'retail_price', 'purchase_price', 'collection','collorway',)
        extra_kwargs = {'release':{'required': False}, 'retail_price':{'required': False}, 'purchase_price':{'required': False}, 'collection':{'required': False}}


class PopulatedSneakerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sneaker
        fields = ('id', 'image', 'product_code', 'brand', 'model_name', 'sneaker_type', 'date_added', 'date_of_last_use', 'user', 'release', 'retail_price', 'purchase_price', 'collection','collorway',)
        extra_kwargs = {'release':{'required': False}, 'retail_price':{'required': False}, 'purchase_price':{'required': False}, 'collection':{'required': False}}


class PlanSerializer(serializers.ModelSerializer):

    class Meta:
        model = Plan
        fields = ('id', 'date', 'sneaker')

class PopulatedPlanSerializer(serializers.ModelSerializer):

    sneaker = SneakerSerializer()
    class Meta:
        model = Plan
        fields = ('id', 'date', 'sneaker')