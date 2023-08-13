from django.db import models
from user_app.models import User

# Create your models here.
class Portfolio(models.Model):
    name = models.CharField(max_length=30, default='Portfolio')
    user = models.OneToOneField(User, related_name='portfolio', on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.name