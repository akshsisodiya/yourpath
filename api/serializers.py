from core.models import UserPost
from rest_framework.response import Response
from rest_framework import serializers
from django.contrib.auth.models import User
from core.models import UserPost, UserProfile, Followed, Like, UserPostLike


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','first_name','last_name']


class LikeSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    liked_by_user = UserSerializer(read_only=True, many=True)
    class Meta:
        model = UserPostLike
        fields = "__all__"


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    user_saved_post = LikeSerializer(read_only=True, many=True)

    class Meta:
        model = UserProfile
        fields = "__all__"
