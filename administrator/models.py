from django.db import models

class Support(models.Model):
    name = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    message = models.TextField()
    time = models.DateTimeField(auto_now=True)
    response = models.BooleanField(default=False)
    read = models.BooleanField(default=False)

    def __str__(self):
        return self.pk

class EmailSubscription(models.Model):
    email = models.CharField(max_length=100)
    time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.email