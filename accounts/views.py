from django.shortcuts import render,redirect
from django.contrib import messages
from .form import CreatUserForm,LoginForm
from django.contrib.auth import logout,login,authenticate
from django.contrib.auth.models import User

def Login(request):

    if request.user.is_authenticated:
        return redirect('/')

    if request.method =="POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        if '@' in username:
            try:
               user = authenticate(username=User.objects.get(email=username).username,password=password)
            except:
                pass
        else:
            user = authenticate(username=username, password=password)

        if user is not None:
            login(request,user)
            return redirect('/')
        else:
            messages.error(request,"Invalid Credentials")
            return redirect('login')
    else:
        form = LoginForm()
    return render(request, 'accounts/login.html',{'form':form})

def Register(request):

    form = CreatUserForm()

    if request.user.is_authenticated:
        return redirect('/')

    if request.method == "POST":
        form = CreatUserForm(request.POST)

        if form.is_valid():
            form.save()
            return redirect('login')
        # return render(request, 'accounts/register.html')
    return render(request, 'accounts/register.html',{'form':form})

def Logout(request):
    logout(request)
    return redirect('/')