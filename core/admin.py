from django.contrib import admin
from .models import UserPost,Like,UserProfile,Followed, UserPostLike
# Register your models here.
admin.site.register(UserPost)
admin.site.register(Like)
admin.site.register(UserProfile)
admin.site.register(Followed)
admin.site.register(UserPostLike)