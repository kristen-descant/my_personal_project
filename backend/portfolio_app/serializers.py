from rest_framework import serializers
from .models import Portfolio
from property_app.serializers import PropertySerializer

class PortfolioSerializer(serializers.ModelSerializer):

    properties = PropertySerializer(many=True)

    class Meta:
        model = Portfolio
        fields = ['id', 'name', 'properties']

    def get_properties(self, obj):
        return [a_property.street for a_property in obj.properties.all()] 

