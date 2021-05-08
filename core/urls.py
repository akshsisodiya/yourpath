from django.urls import path
from .views import *
app_name = "core"
urlpatterns = [
    path('', index, name='index'),
    path('feed/',feed,name='feed'),
    path('add/post/',UploadPost,name='uploadpost'),
    path('user/follow/<str:username>/', follow, name="follow"),
    path('profile/<str:username>/',profile,name="profile"),
    path('search/', searchUser,name="searchUser"),
    path('like/<int:id>/', LikePost,name="likepost"),
]