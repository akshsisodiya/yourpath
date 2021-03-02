from django.shortcuts import render
from django.contrib.auth.models import User
def home(request):
    user = User.objects.all().exclude(username=request.user.username).exclude(username='admin')
    return render(request, 'core/home.html',{'detail':user})

def about_us(request):
    return render(request, 'core/about_us.html')

def contact_us(request):
    return render(request, 'core/contact_us.html')