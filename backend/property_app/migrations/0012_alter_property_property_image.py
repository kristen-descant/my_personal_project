# Generated by Django 4.2.4 on 2023-08-16 14:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('property_app', '0011_list_of_properties_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='property',
            name='property_image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]