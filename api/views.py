from rest_framework import viewsets
from django.core.serializers import serialize
from django.shortcuts import HttpResponse
from django.http import JsonResponse
import json
from rest_framework.response import Response
from .serializers import UserSerializer,LikeSerializer,UserProfileSerializer
from django.contrib.auth.models import User
from core.models import UserPost, UserProfile, Followed, Like,UserPostLike
# Create your views here.

# TODO PWD_FOR_TESTUSER = X6BXfUdrpd2RgBV 


class UserApi(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class PostApi(viewsets.ModelViewSet):
    queryset = UserPostLike.objects.all()
    serializer_class = LikeSerializer


class ProfileApi(viewsets.ModelViewSet):
    serializer_class = UserProfileSerializer

    def get_queryset(self):
        if !self.request.user:
             user = User.objects.get(username = 'admin')
        else:
            user = self.request.user
        return UserProfile.objects.filter(user=user)
