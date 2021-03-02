from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.Login, name='login'),
    path('register/', views.Register, name='register'),
    path('logout/', views.Logout, name='logout'),
    path('follow/<str:username>', views.follow, name='logout'),



    path('<str:username>/', views.userProfile, name='user'),

]