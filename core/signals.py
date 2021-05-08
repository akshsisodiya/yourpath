# from django.contrib.auth.models import User
# from django.db.models.signals import post_save,m2m_changed
# from django.dispatch import receiver
# from .models import Followed,UserProfile

# USELESS, ALL THIS THING IS IMPLEMENTED IN MODELS


# @receiver(post_save,sender=User)
# def create_profile(sender,instance,created,**kwargs):
#     if created:
#         UserProfile.objects.create(user=instance)
#         Followed.objects.create(user=instance)
#
#
#
# @receiver(m2m_changed,sender= Followed.followed.through)
# def add_follower(sender,instance,action,reverse,pk_set,**kwargs):
#     followed_user=[]
#     logged_user = User.objects.get(username=instance)
#     for i in pk_set:
#         user =User.objects.get()
#         following_obj = Followed.objects.get(user=user)
#         followed_user.append(following_obj)
#
#     if action == "pre_add":
#         for i in followed_user:
#             i.follower.add(logged_user)
#             i.save()
#
#     if action == "pre_remove":
#         for i in followed_user:
#             i.follower.remove(logged_user)
#             i.save()