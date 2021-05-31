from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter

routers = DefaultRouter()
routers.register("UserProfileModel", UserProfileApi, basename="userprofile")
routers.register("MiniUserProfileModel", MiniUserProfileApi, basename="miniuserprofile")
routers.register("Feed", FeedAPI, basename="Feed")
urlpatterns = [
    path('', include(routers.urls)),
    path('post/', UploadPost.as_view(), name="uploadPost"),
    path('login/', LoginView.as_view(), name="login"),
    path('logout/', LogoutView.as_view(), name="logout"),
    path('get-csrf/', GetCsrfCookie.as_view(), name="csrf"),
    path('check-auth/', CheckUserAuthentication.as_view(), name="userauth"),

]
