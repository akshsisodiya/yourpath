from django.contrib import admin
from .models import Comment, Profile, Post, Reply

# Register your models here.
admin.site.register(Comment)
admin.site.register(Profile)
admin.site.register(Post)
admin.site.register(Reply)