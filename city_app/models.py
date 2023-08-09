from django.db import models

# Create your models here.
class City(models.Model):
    name = models.CharField()
    state = models.CharField(max_length=2)

    def __str__(self):
        return self.name