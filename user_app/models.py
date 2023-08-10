from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    email = models.EmailField(
        verbose_name='email address',
        unique=True
    )
    REQUIRED_FIELDS = [email]

    def __str__(self):
        return self.email
    