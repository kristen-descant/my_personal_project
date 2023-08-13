# Generated by Django 4.2.4 on 2023-08-13 15:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('property_app', '0008_alter_purchase_worksheet_property_analysis'),
    ]

    operations = [
        migrations.AlterField(
            model_name='purchase_worksheet',
            name='property_analysis',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='matching_purchase_worksheet', to='property_app.property_analysis'),
        ),
    ]
