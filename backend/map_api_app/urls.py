from django.urls import path
from .views import Maps, Address_Autocomplete, Property_Image

urlpatterns = [
    path('autocomplete/<str:input_text>/', Address_Autocomplete.as_view(), name='address_autocomplete'),
    path('propertyimage/<str:input_text>/<str:imgSize>/', Property_Image.as_view(), name='property_image'),
]