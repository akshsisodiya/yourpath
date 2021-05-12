# Generated by Django 3.1.7 on 2021-05-12 12:49

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('core', '0017_auto_20210512_1811'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userpostlike',
            name='liked_by_user',
            field=models.ManyToManyField(blank=True, related_name='liked_post_by_user', to=settings.AUTH_USER_MODEL),
        ),
    ]
