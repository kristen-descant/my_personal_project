from rest_framework import serializers
from .models import Property, Operating_Expenses, Purchase_Worksheet

class PurchaseWorksheetSerializer(serializers.ModelSerializer):

    operating_expenses = serializers.SerializerMethodField()
    matching_property = serializers.SerializerMethodField()

    class Meta:
        model = Purchase_Worksheet
        fields = ['__all__']

class OperatingExpensesSerializer(serializers.ModelSerializer):

    purchase_worksheet = PurchaseWorksheetSerializer(read_only=True)

    class Meta:
        model = Operating_Expenses
        fields = ['__all__', 'purchase_worksheet']

class PropertySerializer(serializers.ModelSerializer):
    
    
    purchase_worksheet = PurchaseWorksheetSerializer()

    class Meta:
        model = Property
        fields = ['__all__', 'purchase_worksheet']
