from django.contrib import admin
from .models import Home, List_of_Homes, Purchase_Worksheet, Operating_Expenses

# Register your models here.
admin.site.register([Home, List_of_Homes, Purchase_Worksheet, Operating_Expenses])