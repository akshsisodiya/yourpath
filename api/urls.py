from django.urls import path, include
from .views import PostApi, UserApi, ProfileApi
from rest_framework.routers import DefaultRouter

routers = DefaultRouter()
routers.register("UserModel",UserApi)
routers.register("PostModel",PostApi,basename='postmodel')
routers.register("UserProfileModel",ProfileApi,basename='profilemodel')
urlpatterns = [
    path('', include(routers.urls)),

]