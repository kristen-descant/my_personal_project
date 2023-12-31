# Generated by Django 4.2.4 on 2023-08-23 18:53

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('property_app', '0011_alter_purchase_worksheet_interest_rate_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='purchase_worksheet',
            name='interest_rate',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=4, null=True, validators=[django.core.validators.MaxValueValidator(1.0)]),
        ),
        migrations.AlterField(
            model_name='purchase_worksheet',
            name='loan_term',
            field=models.PositiveIntegerField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(1)]),
        ),
    ]
