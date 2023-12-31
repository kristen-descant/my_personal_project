from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    email = models.EmailField(verbose_name='email address', unique=True)
    password = models.CharField(max_length=128)  

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS= []

   
        