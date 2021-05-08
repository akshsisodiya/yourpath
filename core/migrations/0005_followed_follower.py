# Generated by Django 3.1.7 on 2021-03-24 14:45

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('core', '0004_followed'),
    ]

    operations = [
        migrations.AddField(
            model_name='followed',
            name='follower',
            field=models.ManyToManyField(related_name='Follower_of_user', to=settings.AUTH_USER_MODEL),
        ),
    ]