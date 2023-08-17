from django.shortcuts import render
from rest_framework.response import Response
import urllib.parse
import requests
from utilities.userPermissions import UserPermissions
from dotenv import dotenv_values
from property_app.models import Property
from django.http import JsonResponse
from django.http import HttpResponse

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
    
class Property_Image(UserPermissions):

    def get(self, request, input_text):

        url = f'https://maps.googleapis.com/maps/api/streetview?size=200x200&location={input_text}&key={MAPSAPIKEY}'

        response = requests.get(url)
        
        if response.status_code == 200 and response.headers.get('Content-Type') == 'image/jpeg':
            image_content = response.content

            # Return the image content as an HTTP response
            return HttpResponse(image_content, content_type='image/jpeg')
        else:
            return HttpResponse("Image not available.")
        



