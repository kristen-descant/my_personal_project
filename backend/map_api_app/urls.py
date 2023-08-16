from django.urls import path
from .views import Maps, Address_Autocomplete

urlpatterns = [
    path('autocomplete/<str:input_text>/', Address_Autocomplete.as_view(), name='address_autocomplete'),
]