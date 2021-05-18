from django.urls import path, include
from .views import UserProfileApi
from rest_framework.routers import DefaultRouter

routers = DefaultRouter()
routers.register("UserProfileModel", UserProfileApi, basename="userprofile")
urlpatterns = [
    path('', include(routers.urls)),

]