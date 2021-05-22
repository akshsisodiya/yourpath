from rest_framework import viewsets
from django.core.serializers import serialize
from django.shortcuts import HttpResponse
from django.http import JsonResponse
import json
from rest_framework.response import Response
from .serializers import ProfileSerializer
from django.contrib.auth.models import User
from core.models import Post,Profile,get_user
# # Create your views here.

# # TODO PWD_FOR_TESTUSER = X6BXfUdrpd2RgBV 

class UserProfileApi(viewsets.ModelViewSet):
    
    serializer_class = ProfileSerializer

    def get_queryset(self):
        return Profile.objects.filter(user=get_user('admin'))