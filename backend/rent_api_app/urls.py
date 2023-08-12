from django.urls import path
from .views import Rent

urlpatterns = [
    path('<int:propid>', Rent.as_view(), name='rent'),
]