from django.urls import path, include
from .views import *
from django.contrib import admin
urlpatterns = [

    path('add-like/<int:id>/', addlike),
    path('follow/<str:username>/', addFollower),
    path('save-post/<int:id>/', savePost),
]