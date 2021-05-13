# Generated by Django 3.1.7 on 2021-05-12 12:05

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('core', '0014_auto_20210512_1053'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserPostLike',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_post_image', models.ImageField(upload_to='media')),
                ('user_post_date', models.DateField(auto_now_add=True)),
                ('user_post_caption', models.TextField(blank=True)),
                ('liked_by_user', models.ManyToManyField(related_name='liked_post_by_user', to=settings.AUTH_USER_MODEL)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
