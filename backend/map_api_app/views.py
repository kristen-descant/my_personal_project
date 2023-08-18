from django.shortcuts import render
from rest_framework.response import Response
import urllib.parse
import requests
from utilities.userPermissions import UserPermissions
from dotenv import dotenv_values
from property_app.models import Property
from django.http import JsonResponse
from utilities.encodeURL import url_encode_address

env = dotenv_values(".env")
MAPSAPIKEY = env.get('MAPSAPIKEY')

class Maps(UserPermissions):

    def get(self, request, propid):

        a_property = Property.objects.get(id=propid)
        address = a_property.get_full_address()

class Address_Autocomplete(UserPermissions):

    def get(self, request, input_text):

        url = f'https://maps.googleapis.com/maps/api/place/autocomplete/json?key={MAPSAPIKEY}&input={input_text}'

        response = requests.get(url)
        json_response = response.json()

        return JsonResponse(json_response)


        



