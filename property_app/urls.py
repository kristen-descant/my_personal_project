from django.urls import path
from .views import Get_Portfolio

urlpatterns = [
    path('portfolio', Get_Portfolio.as_view(), name='get_portfolio'),

]