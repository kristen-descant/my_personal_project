from django.shortcuts import render
from django.contrib.auth import authenticate
from .models import Property, Portfolio
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_404_NOT_FOUND,
    HTTP_204_NO_CONTENT,
    HTTP_401_UNAUTHORIZED
)
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import check_password

# Create your views here.

class Get_Portfolio(APIView):

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]   

    def get(self, request):
        pass

class A_Property(APIView):

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]   

    def get(self, request, id):
        pass

class All_Lists(APIView):

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]   

    def get(self, request):
        pass

class A_List(APIView):

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]   

    def get(self, request, id):
        pass
    
