from django.shortcuts import render
from django.contrib.auth import authenticate
from .models import User
from portfolio_app.models import Portfolio
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_404_NOT_FOUND,
    HTTP_204_NO_CONTENT,
    HTTP_401_UNAUTHORIZED
)
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import check_password
from django.core.exceptions import ValidationError
from utilities.userPermissions import UserPermissions, APIView

class Get_User(UserPermissions):
    def get(self, request):
        return Response({"email": request.user.email})

class Sign_Up(APIView):
    def post(self, request):
        request.data['username'] = request.data.get('email')
        user = User.objects.create_user(**request.data)
        token = Token.objects.create(user=user)
        portfolio = Portfolio.objects.create(user=user)
        return Response(
            {'user': user.email, 'token': token.key}, status=HTTP_201_CREATED
        )

    
class Log_In(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(username=email, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key, "user": user.email, "id": user.id})
        else:
            return Response("No user matching credentials", status=HTTP_404_NOT_FOUND)
        
class Log_Out(UserPermissions):

    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=HTTP_204_NO_CONTENT)
    
class User_Settings(UserPermissions):

    def put(self, request):
        user = request.user
        new_email = request.data.get('email')
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')

        if new_email:
            user.email = new_email
            user.save()
        if old_password and new_password:
            if check_password(old_password, user.password):
                user.set_password(new_password)
                user.save()
            else:
                return Response("Old password does not match", status=HTTP_401_UNAUTHORIZED)
        
        return Response({"user": request.user.email})
    
