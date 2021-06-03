from rest_framework import viewsets
from django.core.serializers import serialize
from django.shortcuts import HttpResponse, redirect, get_object_or_404, Http404
from django.http import JsonResponse
import json
from rest_framework.response import Response
from .serializers import ProfileSerializer, MiniUserSerializer, PostSerializer
from django.contrib import auth
from django.contrib.auth.models import User
from core.models import Post, Profile, get_user, Comment
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import permissions
# # Create your views here.
from rest_framework.decorators import api_view


def DefaultUser():
    return get_user('aman')

# # TODO PWD_FOR_AMAN = VCYNK25PqPK6FvT
# # TODO PWD_FOR_YASH = QeiYbGwPjX945nX

class UserProfileApi(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer

    def get_queryset(self):
        return Profile.objects.filter(user=get_user(self.request.GET.get('username', self.request.user)))


class MiniUserProfileApi(viewsets.ModelViewSet):
    serializer_class = MiniUserSerializer

    def get_queryset(self):
        return Profile.objects.filter(user=get_user(self.request.GET.get('username', self.request.user)))

class FeedAPI(viewsets.ModelViewSet):
    serializer_class = PostSerializer

    def get_queryset(self,*args,**kwargs):
        upper = 5 * int(self.request.GET.get('page'))
        lower = upper - 5
        profile_obj = Profile.objects.get(user=self.request.user) if self.request.user.is_authenticated else Profile.objects.get(user= DefaultUser())

        followings_list = list(profile_obj.followings.all())
        return Post.objects.filter(user__in = followings_list).order_by('-pk')[lower:upper]



@method_decorator(csrf_protect, name='dispatch')
class UploadPost(APIView):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        data = self.request.data
        try:
            Post.objects.create(
                user=self.request.user,
                post_img=data['postimg'],
                text=data['caption']
            ).save()
            return Response({'error': "Upload Failure"})

        except:
            return Response({'success': "Post Uploaded successfully"})


@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
    permission_classes = [permissions.AllowAny]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        data = self.request.data
        user = auth.authenticate(username=data['username'], password=data['password'])

        if user is not None:
            auth.login(request, user)
            return Response({'success': 'User logged in.'})
        else:
            return Response({'error': 'Error in Authentication.'})


class LogoutView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        auth.logout(request)
        return Response({'success': 'User logged out.'})


@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCsrfCookie(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, format=None):
        return Response({'success': 'CSRF cookie set'})


@method_decorator(csrf_protect, name='dispatch')
class CheckUserAuthentication(APIView):
    def get(self, request, format=None):
        isAuthenticated = self.request.user.is_authenticated

        if isAuthenticated:
            return Response({'isAuthenticated': True})
        else:
            return Response({'isAuthenticated': False})
