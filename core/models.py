from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save, m2m_changed
from django.dispatch import receiver


# User post model
class UserPost(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post_image = models.ImageField(upload_to='media')
    post_date = models.DateField(auto_now_add=True)
    post_caption = models.TextField(blank=True)
   
    def __str__(self):
        return f"{str(self.user) } {str(self.post_date)} {str(self.id)}"


# Like and Dislike model
class Like(models.Model):

    user = models.ManyToManyField(User, related_name="like_by_user")

    post = models.OneToOneField(UserPost, on_delete=models.CASCADE)
    like = models.IntegerField(default=0)

    @classmethod
    def liked(cls, post, liked_by_user):
        obj, create = cls.objects.get_or_create(post=post)
        obj.user.add(liked_by_user)
 
    @classmethod
    def dislike(cls, post, disliked_by_user):
        obj, create = cls.objects.get_or_create(post=post)
        obj.user.remove(disliked_by_user)
  

    def __str__(self):
        return f'{str(self.post)}'




# Followed Model
class Followed(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    followed = models.ManyToManyField(User, related_name="Followed_by_user")
    follower = models.ManyToManyField(User, related_name="Follower_of_user")

    @classmethod
    def follow(cls, user, another_user):
        obj, create = cls.objects.get_or_create(user=user)
        obj.followed.add(another_user)

    @classmethod
    def unfollow(cls, user, another_user):
        obj, create = cls.objects.get_or_create(user=user)
        obj.followed.remove(another_user)

    def __str__(self):
        return str(self.user.username)



# Again some kinda signal it is used
# when userA follows userB then userA will be added in userB's following list
# and vice versa
@receiver(m2m_changed, sender=Followed.followed.through)
def add_follower(sender, instance, action, reverse, pk_set, **kwargs):
    followed_user = []
    logged_user = User.objects.get(username=instance)
    for i in pk_set:
        user = User.objects.get(pk=i)
        following_obj = Followed.objects.get(user=user)
        followed_user.append(following_obj)

    # Add user in following list
    if action == "pre_add":
        for i in followed_user:
            i.follower.add(logged_user)
            i.save()
    # Remove user from following list
    if action == "pre_remove":
        for i in followed_user:
            i.follower.remove(logged_user)
            i.save()

class UserPostLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    user_post_image = models.ImageField(upload_to='media')
    user_post_date = models.DateField(auto_now_add=True)
    user_post_caption = models.TextField(blank=True)
    liked_by_user = models.ManyToManyField(User, related_name="liked_post_by_user", blank=True)
   
    def __str__(self):
        return f"{str(self.user) } {str(self.user_post_date)} {str(self.id)}"

# Userprofile Model
class UserProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    user_image = models.ImageField(
                                    upload_to='user_profile_images',
                                    default='/media/default.png')
    user_bio = models.CharField(max_length=150, blank=True)

    # External Link is to put some kinda link in user's bio
    user_external_link = models.URLField(blank=True, default='')

    # Not using this shit anymore. Calculating no. of followers and following
    # by counting the total user in ONE-TO-ONE FIELD in views
    user_follower = models.IntegerField(default=0)
    user_following = models.IntegerField(default=0)

    user_total_post = models.IntegerField(default=0)

    user_saved_post = models.ManyToManyField(UserPostLike, related_name="saved_post", blank=True)

    def __str__(self):
        return f'{str(self.user)}'


# This function is used to create UserProfie object and Follow object of user
# whenenver new user signup
def create_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)
        Followed.objects.create(user=instance)


# Singnal to call CREATE PROFILE method when new USER object is saved(SignUp) 
post_save.connect(create_profile, sender=User)