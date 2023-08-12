from django.shortcuts import render
from rest_framework.response import Response
import urllib.parse
import requests
from utilities.userPermissions import UserPermissions
from dotenv import dotenv_values
from property_app.models import Property

# Create your views here.
class Rent(UserPermissions):

    def get(self, request, propid):
        env = dotenv_values(".env")
        APIKEY = env.get('apikey')

        a_property = Property.objects.get(id=propid)
        address = a_property.get_full_address()

        endpoint = 'https://www.rentometer.com/api/v1/summary'

        params = {
        "api_key": APIKEY,
        "address": address,
        "bedrooms": a_property.beds,
        "baths": a_property.baths
        }

        encoded_params = urllib.parse.urlencode(params)
        response = requests.get(endpoint, encoded_params)
        json_response = response.json()
        return Response(json_response)

