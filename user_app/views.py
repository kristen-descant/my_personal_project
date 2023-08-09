from django.shortcuts import render
from django.contrib.auth import authenticate
from .models import User
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
class Sign_Up(APIView):
    def post(self, request):
        user = User.objects.create_user(**request.data)
        token = Token.objects.create(user=user)
        return Response(
            {'user': user.email, 'token': token.key}, status=HTTP_201_CREATED
        )
    
class Log_In(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key, "user": user.email})
        else:
            return Response("No user matching credentials", status=HTTP_404_NOT_FOUND)
        
class Log_Out(APIView):

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=HTTP_204_NO_CONTENT)
    
class User_Settings(APIView):

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        new_username = request.data.get('username')
        new_email = request.data.get('email')
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')
        
        if new_username:
            user.username = new_username
        if new_email:
            user.email = new_email
        if old_password and new_password:
            if check_password(old_password, user.password):
                user.set_password(new_password)
                user.save()
            else:
                return Response("Old password does not match", status=HTTP_401_UNAUTHORIZED)
        
        return Response({"user": request.user.email})