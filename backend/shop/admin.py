from django.contrib import admin
from .models import Product, Banner


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "price", "category", "stock", "isNew", "discount", "rating")
    list_filter = ("category", "isNew")
    search_fields = ("name", "description")
    fieldsets = (
        ("Basic Information", {"fields": ("name", "description", "category")}),
        ("Images", {"fields": ("image",)}),
        ("Pricing", {"fields": ("price", "originalPrice", "discount")}),
        ("Product Status", {"fields": ("isNew", "stock")}),
        ("Ratings & Reviews", {"fields": ("rating", "reviewCount")}),
        (
            "Technical Specifications",
            {
                "fields": ("specs",),
                "description": 'Enter specifications as JSON. Example: {"Processor": "M1", "RAM": "8GB"}',
            },
        ),
    )


admin.site.register(Banner)
