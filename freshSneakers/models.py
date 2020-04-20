from django.core.validators import validate_comma_separated_integer_list
from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()


# Create your models here.

class Sneaker(models.Model):
    image = models.CharField(max_length=500, blank=True, default='')
    product_code = models.CharField(max_length=50, blank=True, default='')
    brand = models.CharField(max_length=50)
    model_name = models.CharField(max_length=200, blank=True, default='')
    RELEASE_TYPE_CHOICES = [
        ('gr', 'General Release'),
        ('collab', 'Collaboration'),
    ]
    release = models.CharField(
      max_length=50,
        choices=RELEASE_TYPE_CHOICES,
        default='gr',
    )
    SNEAKER_TYPE = [
        ('LIFESTYLE', 'Lifestyle'),
        ('READYTOWEAR', 'Ready-to-Wear'),
        ('CASUAL', 'Casual'),
        ('BOOTS', 'Boots'),
        ('RUNNING', 'Running'),
        ('OUTDOOR', 'Outdoor'),
        ('TRAINING', 'Training'),
        ('FOOTBALL', 'Football'),
        ('BASKETBALL', 'Basketball'),
        ('TENNIS', 'Tennis'),
        ('GOLF', 'Golf'),
        ('RUGBY', 'Rugby'),
        ('WEIGHTLIFTING', 'Weightlifting'),
        ('RUGBY', 'Rugby'),
        ('SKATEBOARDING', 'Skateboarding'),
    ]
    sneaker_type = models.CharField(
      max_length=50,
        choices=SNEAKER_TYPE,
        default='',
    )
    date_added = models.DateField(auto_now_add=True)
    retail_price = models.CharField(validators=[validate_comma_separated_integer_list], max_length=200, blank=True, null=True, default='')
    purchase_price = models.CharField(validators=[validate_comma_separated_integer_list], max_length=200, blank=True, null=True, default='')
    collection = models.CharField(max_length=200, blank=True, default='')
    date_of_last_use = models.DateField()
    user = models.ForeignKey(User, on_delete=models.CASCADE,)

    def __str__(self):
        return self.model_name

class Plan(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,)
    date = models.DateField(auto_now_add=True)
    sneaker = models.ForeignKey(Sneaker, related_name='sneaker', on_delete=models.CASCADE)
    def __str__(self):
        return f'{self.date} - {self.sneaker}'