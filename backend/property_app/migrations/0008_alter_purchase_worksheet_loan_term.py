# Generated by Django 4.2.4 on 2023-08-23 17:32

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('property_app', '0007_alter_operating_expenses_cap_ex_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='purchase_worksheet',
            name='loan_term',
            field=models.PositiveIntegerField(blank=True, default=30, null=True, validators=[django.core.validators.MinValueValidator(1)]),
        ),
    ]