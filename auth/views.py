from django.shortcuts import render, redirect
from django.views.decorators.http import require_http_methods
from django.views.decorators.cache import cache_control
from .forms import SignUpForm,LoginForm
from django.contrib.auth.models import Group,User
from django.contrib.auth import authenticate,login,logout
from django.contrib import messages
# Create your views here.

@cache_control(no_cache=True, must_revalidate=True, no_store=True)
def Signup(request):
    form = SignUpForm()

    if request.user.is_authenticated:
        return redirect('/')

    if request.method == "POST":
        form =SignUpForm(request.POST)
        if form.is_valid():
            user=form.save()
            group = Group.objects.get(name=request.POST.get('radio-role'))

            user.groups.add(group)
            return redirect('/auth/login/')

    return render(request,'auth/signup.html',{'form':form})

@cache_control(no_cache=True, must_revalidate=True, no_store=True)
def Login(request):
    form = LoginForm()

    if request.user.is_authenticated:
        return redirect('/')

    if request.method == "POST":
        form= LoginForm(request.POST)
        user = authenticate(request,username=request.POST.get('username'),password=request.POST.get('password'))
        if user is not None:
            login(request,user)
            return redirect('/')
        else:
            messages.error(request,'Invalid Credentials.')
            return redirect('/auth/login/')
    return render(request,'auth/login.html',{'form':form})


@require_http_methods(["POST","GET"])
def Logout(request):
    logout(request)
    print('Ajax was here')
    return redirect('/')