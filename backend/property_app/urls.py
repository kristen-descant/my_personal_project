from django.urls import path
from .views import (Get_Portfolio, Create_Property, A_Property, All_Lists, 
                    A_List, Add_To_List, Remove_From_List, Add_To_Portfolio,
                    Remove_From_Portfolio, Purchase_Worksheet_View)
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('portfolio/', Get_Portfolio.as_view(), name='get_portfolio'),
    path('', Create_Property.as_view(), name='create_property'),
    path('property/<int:id>/', A_Property.as_view(), name='a_property'),
    path('lists/', All_Lists.as_view(), name='all_lists'),
    path('lists/<int:id>/', A_List.as_view(), name='a_list'),
    path('add/property/<int:propid>/lists/<int:listid>/', Add_To_List.as_view(), name='add_to_list'),
    path('remove/property/<int:propid>/lists/<int:listid>/', Remove_From_List.as_view(), name='remove_to_list'),
    path('add/property/<int:propid>/portfolio/', Add_To_Portfolio.as_view(), name='add_to_portfolio'),
    path('remove/property/<int:propid>/portfolio/', Remove_From_Portfolio.as_view(), name='remove_from_portfolio'),
    path('property/<int:propid>/purchaseworksheet/', Purchase_Worksheet_View.as_view(), name='purchase_worksheet_view'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)