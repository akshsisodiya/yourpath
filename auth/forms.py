from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm,AuthenticationForm


class SignUpForm(UserCreationForm):
    username = forms.CharField(widget=forms.TextInput(attrs={'class':'form-custom form-control'}))
    first_name = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-custom form-control'}))
    last_name = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-custom form-control'}))
    email = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-custom form-control'}))
    password1 = forms.CharField(label='Password',widget=forms.PasswordInput(attrs={'class': 'form-custom form-control'}))
    password2 = forms.CharField(label='Confirm Password', widget=forms.PasswordInput(attrs={'class': 'form-custom form-control'}))

    class Meta:
        model = User
        fields = ['username','first_name','last_name','email','password1','password2']

class LoginForm(AuthenticationForm):
    username = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-custom form-control'}))
    password = forms.CharField(label='Password',widget=forms.PasswordInput(attrs={'class': 'form-custom form-control'}))

    class Meta:
        model = User
        fields = ['username','password']
