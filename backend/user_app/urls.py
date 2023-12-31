from django.urls import path
from .views import Sign_Up, Log_In, Log_Out, User_Settings, Get_User

urlpatterns = [
    path('', Get_User.as_view(), name='get_user'),
    path('signup/', Sign_Up.as_view(), name='signup'),
    path('login/', Log_In.as_view(), name='login'),
    path('logout/', Log_Out.as_view(), name='logout'),
    path('settings/', User_Settings.as_view(), name='user_info'),
]