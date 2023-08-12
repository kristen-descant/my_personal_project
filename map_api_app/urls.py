from django.urls import path
from .views import Maps, Address_Autocomplete

urlpatterns = [
    path('<int:propid>', Maps.as_view(), name='rent'),
    path('autocomplete/', Address_Autocomplete.as_view(), name='address_autocomplete'),
]