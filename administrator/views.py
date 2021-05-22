from django.shortcuts import render
from django.http import JsonResponse
from .models import Support, EmailSubscription
# Create your views here.
def submit_support(request):
    if request.method == 'POST':
        r = request.POST
        obj = Support(name=r['name'], email=r['email'], message=['message'])
        obj.save()
        return JsonResponse({'status':200})
    return JsonResponse({'status':400})

def submit_email_subscription(request):
    if request.method == 'POST':
        obj = EmailSubscription(email=request.POST['email'])
        obj.save()
        return JsonResponse({'status':200})
    return JsonResponse({'status':400})