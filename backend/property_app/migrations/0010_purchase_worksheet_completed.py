# Generated by Django 4.2.4 on 2023-08-13 15:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('property_app', '0009_alter_purchase_worksheet_property_analysis'),
    ]

    operations = [
        migrations.AddField(
            model_name='purchase_worksheet',
            name='completed',
            field=models.BooleanField(default=False),
        ),
    ]