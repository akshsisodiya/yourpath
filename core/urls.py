from django.urls import path, include
from .views import *
from django.contrib import admin
urlpatterns = [
    path('',index),
    path('profile',index),
    path('upload',index),
    path('profile/<str:username>/',index2),
    path('chat/',index),
    path('add-like/<int:id>/', addlike),
    path('follow/<str:username>/', addFollower),
    path('save-post/<int:id>/', savePost),
    path('add-comment/<int:id>/',addComment),
    path('add-comment-like/<int:id>/',addLikeToComment),
    path('delete-post/<int:id>/',deletePost),
]
