from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Follow(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    followed = models.ManyToManyField(User,related_name="followed")

    @classmethod
    def follow(self,user,other_acc):
        obj,create = self.objects.get_or_create(user=user)
        obj.followed.add(other_acc)

    @classmethod
    def unfollow(self, user, other_acc):
        obj, create = self.objects.get_or_create(user=user)
        obj.followed.remove(other_acc)

    def __str__(self):
        return str(self.user.username)