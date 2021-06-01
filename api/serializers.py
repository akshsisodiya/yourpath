from rest_framework.response import Response
from rest_framework import serializers
from django.contrib.auth.models import User
from core.models import Post, Profile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", 'first_name', 'last_name']

class MiniUserSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Profile
        fields = ['user','profile']
        depth = 1

class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    saved = UserSerializer(read_only=True, many= True)
    likes = UserSerializer(read_only=True, many= True)

    class Meta:
        model = Post
        fields = "__all__"



class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    posts = PostSerializer(read_only=True, many= True)
    followers = UserSerializer(read_only=True, many= True)
    followings = UserSerializer(read_only=True, many= True)

    class Meta:
        model = Profile
        fields = "__all__"

class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    posts = PostSerializer(read_only=True, many= True)

    class Meta:
        model = Profile
        fields = "__all__"