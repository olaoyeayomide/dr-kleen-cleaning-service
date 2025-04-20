from django.db import models

# Create your models here.


class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.URLField(max_length=500)
    category = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    isNew = models.BooleanField(default=False)
    discount = models.IntegerField(null=True, blank=True)
    originalPrice = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True
    )
    rating = models.FloatField(null=True, blank=True)
    reviewCount = models.IntegerField(default=0)
    stock = models.IntegerField(default=0)
    specs = models.JSONField(null=True, blank=True)  # Store specifications as JSON

    def __str__(self):
        return self.name


class Banner(models.Model):
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255)
    discount = models.CharField(max_length=100)
    image = models.URLField(max_length=500)
    bgColor = models.CharField(max_length=20, default="#1B1F2D")

    def __str__(self):
        return self.title
