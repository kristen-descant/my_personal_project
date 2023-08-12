from django.contrib import admin
from .models import Property, List_of_Properties, Purchase_Worksheet, Operating_Expenses

# Register your models here.
admin.site.register([Property, List_of_Properties, Purchase_Worksheet, Operating_Expenses])