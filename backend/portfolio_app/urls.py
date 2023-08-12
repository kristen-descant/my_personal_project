from django.urls import path
from .views import Get_Portfolio

urlpatterns = [
    path('', Get_Portfolio.as_view(), name='get_portfolio'),
]