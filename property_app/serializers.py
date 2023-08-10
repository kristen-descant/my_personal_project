from rest_framework import serializers
from .models import Property, Operating_Expenses, Purchase_Worksheet

class PurchaseWorksheetSerializer(serializers.ModelSerializer):

    operating_expenses = serializers.SerializerMethodField()
    matching_property = serializers.SerializerMethodField()

    class Meta:
        model = Purchase_Worksheet
        fields = ['id', 'matching_property', 'purchase_price', 'financing', 'interest_rate',
                  'purchase_cost', 'gross_rent', 'arv', 'down_payment', 'loan_term', 'rehab_cost',
                  'vancancy_rate', 'operating_expenses']

class OperatingExpensesSerializer(serializers.ModelSerializer):

    purchase_worksheet = PurchaseWorksheetSerializer(read_only=True)

    class Meta:
        model = Operating_Expenses
        fields = ['id', 'property_taxes', 'insurance', 'property_management',
                  'maintenance', 'cap_ex', 'hoa_fees', 'utilitites', 'landscaping',
                  'other_exp', 'purchase_worksheet']

class PropertySerializer(serializers.ModelSerializer):
    
    
    purchase_worksheet = PurchaseWorksheetSerializer()

    class Meta:
        model = Property
        fields = ['id', 'property_image', 'street', 'city', 'state', 'zip_code',
                  'beds', 'baths', 'sqft', 'details', 'portfolio', 'list_of_properties',
                  'purchase_worksheet']