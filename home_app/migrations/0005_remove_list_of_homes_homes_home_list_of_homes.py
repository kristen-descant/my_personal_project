# Generated by Django 4.2.4 on 2023-08-09 20:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home_app', '0004_remove_home_list_of_homes_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='list_of_homes',
            name='homes',
        ),
        migrations.AddField(
            model_name='home',
            name='list_of_homes',
            field=models.ManyToManyField(blank=True, related_name='homes', to='home_app.list_of_homes'),
        ),
    ]
