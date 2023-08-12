from rest_framework import serializers
from .models import Property, Operating_Expenses, Purchase_Worksheet, List_of_Properties, Portfolio

class PurchaseWorksheetSerializer(serializers.ModelSerializer):

    matching_property = serializers.SerializerMethodField()

    class Meta:
        model = Purchase_Worksheet
        fields = ['id', 'matching_property', 'purchase_price', 'financing', 'interest_rate',
                  'purchase_cost', 'gross_rent', 'arv', 'down_payment', 'loan_term',
                  'rehab_cost', 'vacancy_rate', 'operating_expenses']
        
    def get_matching_property(self, obj):
        return obj.matching_property.street

class OperatingExpensesSerializer(serializers.ModelSerializer):

    purchase_worksheet = PurchaseWorksheetSerializer(read_only=True)

    class Meta:
        model = Operating_Expenses
        fields = ['id', 'property_taxes', 'insurance', 'property_management',
                  'maintenance', 'cap_ex', 'hoa_fees', 'utilitites', 'landscaping',
                  'other_exp', 'purchase_worksheet']



class PropertySerializer(serializers.ModelSerializer):

    list_of_properties_names = serializers.SerializerMethodField()    
    purchase_worksheet = PurchaseWorksheetSerializer()
    portfolio = serializers.SerializerMethodField()

    class Meta:
        model = Property
        fields = ['id', 'property_image', 'street', 'city', 'state',
                  'beds', 'baths', 'sqft', 'details', 'portfolio', 'list_of_properties',
                  'purchase_worksheet', 'list_of_properties_names']

    def get_list_of_properties_names(self, obj):
        return [list_item.list_name for list_item in obj.list_of_properties.all()]
    
    def get_portfolio(self, obj):
        if obj.portfolio:
            return obj.portfolio.name

        
class ListSerializer(serializers.ModelSerializer):

    properties = PropertySerializer(many=True)

    class Meta:
        model = List_of_Properties
        fields = ['id', 'list_name', 'properties']

    def get_properties(self, obj):
        return [a_property.street for a_property in obj.properties.all()]