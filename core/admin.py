from django.contrib import admin
from .models import Comment, Profile, Post, Reply

# Register your models here.
class PostAdmin(admin.ModelAdmin):
    list_display = ('pk','post_time_stamp',)


admin.site.register(Comment)
admin.site.register(Profile)
admin.site.register(Post,PostAdmin)
admin.site.register(Reply)