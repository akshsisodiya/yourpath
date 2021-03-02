from django.contrib.auth.forms import UserCreationForm,AuthenticationForm
from django.contrib.auth.models import User
from django import forms


class CreatUserForm(UserCreationForm):

    email = forms.CharField(widget=forms.TextInput(attrs={'class':'form-control','required': True}) )
    class Meta:
        model = User
        fields = ['username','email','first_name','last_name', 'password1', 'password2']

    def clean_email(self):
        email = self.cleaned_data['email']
        try:
            match = User.objects.get(email = email)
        except:
            return self.cleaned_data['email']
        raise forms.ValidationError("Email Already Exist.")


class LoginForm(AuthenticationForm):
    class Meta:
        model = User
        fields = [ 'username', 'password']

    def __init__(self, *args, **kwargs):
        super(LoginForm, self).__init__(*args, **kwargs)
        self.fields['username'].widget.attrs['class'] = "form-control"
        self.fields['username'].widget.attrs['placeholder'] = "Username or Email"

        self.fields['password'].widget.attrs['class'] = "form-control"
        self.fields['password'].widget.attrs['placeholder'] = "Password"

