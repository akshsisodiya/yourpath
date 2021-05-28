from rest_framework import viewsets
from django.core.serializers import serialize
from django.shortcuts import HttpResponse,redirect
from django.http import JsonResponse
import json
from rest_framework.response import Response
from .serializers import ProfileSerializer,MiniUserSerializer
from django.contrib import auth
from django.contrib.auth.models import User
from core.models import Post,Profile,get_user
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import permissions
# # Create your views here.
from rest_framework.decorators import api_view

# # TODO PWD_FOR_TESTUSER = X6BXfUdrpd2RgBV 

class UserProfileApi(viewsets.ModelViewSet):

    serializer_class = ProfileSerializer

    def get_queryset(self):
        return Profile.objects.filter(user=get_user('admin'))

class MiniUserProfileApi(viewsets.ModelViewSet):
    serializer_class = MiniUserSerializer
    def get_queryset(self):
        return Profile.objects.filter(user=get_user(self.request.GET.get('username')))

@method_decorator(csrf_protect,name='dispatch')
class UploadPost(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self,request,format=None):
        data = self.request.data
        try:
            Post.objects.create(
                user=self.request.user,
                post_img=data['postimg'],
                text=data['caption']
            ).save()
            return Response({'error': "Upload Failure"})

        except:
               return Response({'success':"Post Uploaded successfully"})

@method_decorator(csrf_protect,name='dispatch')
class LoginView(APIView):
    permission_classes = [permissions.AllowAny]
    parser_classes = [MultiPartParser, FormParser]   

    def post(self,request,format= None):
        data = self.request.data
        user = auth.authenticate(username=data['username'],password=data['password'])

        if user is not None:
            auth.login(request,user)
            return Response({'success':'User logged in.'})
        else:
            return Response({'error':'Error in Authentication.'})

class LogoutView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self,request,format=None):
        auth.logout(request)
        return Response({'success': 'User logged out.'})


@method_decorator(ensure_csrf_cookie,name='dispatch')
class GetCsrfCookie(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self,request,format=None):
        return Response({'success':'CSRF cookie set'})

@method_decorator(csrf_protect,name='dispatch')
class CheckUserAuthentication(APIView):
    def get(self,request,format=None):
        isAuthenticated = self.request.user.is_authenticated

        if isAuthenticated:
            return Response({'isAuthenticated': True})
        else:
            return Response({'isAuthenticated': False})
