# Generated by Django 3.1.7 on 2021-05-12 12:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0015_userpostlike'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='user_saved_post',
            field=models.ManyToManyField(related_name='saved_post', to='core.UserPostLike'),
        ),
    ]