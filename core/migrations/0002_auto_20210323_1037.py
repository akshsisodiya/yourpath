# Generated by Django 3.1.7 on 2021-03-23 05:07

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userpost',
            name='post_image',
            field=models.ImageField(upload_to='media'),
        ),
        migrations.CreateModel(
            name='Like',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('like', models.IntegerField(default=0)),
                ('post', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='core.userpost')),
                ('user', models.ManyToManyField(related_name='like_by_user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]