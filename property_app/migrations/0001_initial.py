# Generated by Django 4.2.4 on 2023-08-10 01:42

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('portfolio_app', '__first__'),
    ]

    operations = [
        migrations.CreateModel(
            name='List_of_Properties',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('list_name', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Operating_Expenses',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('property_taxes', models.DecimalField(decimal_places=2, max_digits=10, null=True)),
                ('insurance', models.DecimalField(decimal_places=2, max_digits=10)),
                ('property_management', models.DecimalField(decimal_places=2, max_digits=3, validators=[django.core.validators.MaxValueValidator(1.0)])),
                ('maintenance', models.DecimalField(decimal_places=2, max_digits=3, validators=[django.core.validators.MaxValueValidator(1.0)])),
                ('cap_ex', models.DecimalField(decimal_places=2, max_digits=3, validators=[django.core.validators.MaxValueValidator(1.0)])),
                ('hoa_fees', models.DecimalField(decimal_places=2, max_digits=10)),
                ('utilities', models.DecimalField(decimal_places=2, max_digits=10)),
                ('landscaping', models.DecimalField(decimal_places=2, max_digits=10)),
                ('other_exp', models.DecimalField(decimal_places=2, max_digits=10)),
            ],
        ),
        migrations.CreateModel(
            name='Property',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('property_image', models.ImageField(default='property_images/temp_house.png', upload_to='property_images/')),
                ('street', models.CharField(default='New Property')),
                ('city', models.CharField()),
                ('state', models.CharField(max_length=2)),
                ('zip_code', models.CharField(max_length=5, null=True)),
                ('beds', models.PositiveIntegerField()),
                ('baths', models.PositiveIntegerField(validators=[django.core.validators.MinValueValidator(1)])),
                ('sqft', models.PositiveBigIntegerField()),
                ('details', models.TextField()),
                ('list_of_properties', models.ManyToManyField(blank=True, related_name='properties', to='property_app.list_of_properties')),
                ('portfolio', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='properties', to='portfolio_app.portfolio')),
            ],
        ),
        migrations.CreateModel(
            name='Purchase_Worksheet',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('purchase_price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('financing', models.BooleanField(default=True)),
                ('interest_rate', models.DecimalField(decimal_places=2, max_digits=3, validators=[django.core.validators.MaxValueValidator(1.0)])),
                ('purchase_cost', models.DecimalField(decimal_places=2, max_digits=3, validators=[django.core.validators.MaxValueValidator(1.0)])),
                ('gross_rent', models.DecimalField(decimal_places=2, max_digits=10)),
                ('arv', models.DecimalField(decimal_places=2, max_digits=10)),
                ('down_payment', models.DecimalField(decimal_places=2, max_digits=3, validators=[django.core.validators.MaxValueValidator(1.0)])),
                ('loan_term', models.PositiveIntegerField(validators=[django.core.validators.MinValueValidator(1)])),
                ('rehab_cost', models.DecimalField(decimal_places=2, max_digits=10)),
                ('vacancy_rate', models.DecimalField(decimal_places=2, max_digits=3, validators=[django.core.validators.MaxValueValidator(1.0)])),
                ('matching_property', models.OneToOneField(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='purchase_worksheet', to='property_app.property')),
                ('operating_expenses', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='purchase_worksheet', to='property_app.operating_expenses')),
            ],
        ),
    ]