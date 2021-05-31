from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


# Create your models here.


def get_user(username):
    return User.objects.get(username=username)


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE , related_name = "user_comment")
    post = models.ForeignKey('Post', on_delete=models.CASCADE, related_name = "user_reply")
    text = models.TextField()
    likes = models.ManyToManyField(User ,related_name = "comment_like")
    replies = models.ManyToManyField('Reply', related_name='comment_replies')

    class Manager():
        def __init__(self, comment):
            self.comment = Comment.objects.model(pk=comment)

        def add_like(self, username):
            user = get_user(username)
            self.comment.likes.add(user)
            self.comment.save()

        def add_reply(self, reply):
            self.comment.replies.add(reply)
            self.comment.save()
@receiver(post_save, sender=Comment)
def create_comment(sender, instance, created, **kwargs):
    if created:
        Post.Manager(instance.post.pk).add_comment(instance)

class Reply(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reply_user")
    user_to = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reply_to_user")
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name="comment_obj")
    text = models.TextField()
    likes = models.ManyToManyField(User , related_name="reply_like")

    class Manager():
        def __init__(self, reply):
            self.reply = Reply.objects.get(pk = reply)

        def add_like(self, username):
            user = get_user(username)
            self.reply.likes.add(user)
            self.reply.save()

@receiver(post_save, sender=Reply)
def create_reply(sender, instance, created, **kwargs):
    if created:
        Comment.Manager(instance.comment.pk).add_reply(instance)


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE , related_name="post_user")
    post_img = models.ImageField(upload_to='post_image',blank=True)
    text = models.TextField()
    likes = models.ManyToManyField(User, related_name="post_like", blank=True)
    comments = models.ManyToManyField(Comment, related_name="post_comment", blank=True)
    shares = models.ManyToManyField(User, related_name="post_shares", blank=True)
    saved = models.ManyToManyField(User, related_name="post_saved", blank=True)
    # post_time_stamp = models.DateTimeField()

    class Manager():
        def __init__(self, post):
            self.post = Post.objects.get(pk=post)

        def get_comment(self, comment):
            return Comment.objects.get(pk=comment)

        def add_like(self, username):
            user = get_user(username)
            self.post.likes.add(user)
            Profile.Manager(user).add_liked_post(self.post)
            self.post.save()

        def dislike(self, username):
            user = get_user(username)
            self.post.likes.remove(user)
            Profile.Manager(user).remove_disliked_post(self.post)
            self.post.save()

        def add_save(self, username):
            user = get_user(username)
            self.post.saved.add(user)
            Profile.Manager(user).add_saved_post(self.post)
            self.post.save()

        def remove_save(self,username):
            user = get_user(username)
            self.post.saved.remove(user)
            Profile.Manager(user).remove_saved_post(self.post)
            self.post.save()

        def add_comment(self, comment):
            self.post.comments.add(comment)
            self.post.save()

    def __str__(self):
        return f'Post {str(self.pk)} {str(self.user.username)}'

class Profile(models.Model):
    # Normal Details
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="user_profile")
    profile = models.ImageField(upload_to='user_profile_image', blank=False)
    cover = models.ImageField(upload_to='user_cover_image', blank = True)
    bio = models.CharField(max_length=150, blank = True)
    external_link = models.URLField(blank=True, default='')

    # Extra detail
    followers = models.ManyToManyField(User, related_name='user_followers', blank=True)
    followings = models.ManyToManyField(User, related_name='user_following', blank=True)
    posts = models.ManyToManyField(Post , blank=True)
    # TODO projects = models.ManyToManyField(Projects)

    # User Details for profile owners only
    liked_posts = models.ManyToManyField(Post ,related_name='user_liked_post', blank = True)
    saved_posts = models.ManyToManyField(Post ,related_name='user_saved_post', blank = True)

    # Is user Varified
    is_varified = models.BooleanField(default=False)

    class Manager():
        def __init__(self, username): # for make follower function
            self.user = Profile.objects.get(user=username)

        def add_post(self, post):
            self.user.posts.add(post)
            self.user.save()

        def add_saved_post(self,  post_id):
            # post = Post.objects.get(pk=post_id)
            self.user.saved_posts.add(post_id)
            self.user.save()

        def remove_saved_post(self,  post_id):
            # post = Post.objects.get(pk=post_id)
            self.user.saved_posts.remove(post_id)
            self.user.save()

        def add_liked_post(self, post_id):
            # post = Post.objects.get(pk=post_id)
            self.user.liked_posts.add(post_id)
            self.user.save()

        def remove_disliked_post(self, post_id):
            # post = Post.objects.get(pk=post_id)
            self.user.liked_posts.remove(post_id)
            self.user.save()

        def add_follower(self, follower):
            follower = Profile.objects.get(user=follower)
            self.user.followings.add(follower.user)
            follower.followers.add(self.user.user)
            self.user.save()
            follower.save()

        def remove_follower(self, follower):
            follower = Profile.objects.get(user=follower)
            self.user.followings.remove(follower.user)
            follower.followers.remove(self.user.user)
            self.user.save()
            follower.save()

        def change_varification(self, boolean_value):
            self.user.is_varified = boolean_value
            self.user.save()

    def __str__(self):
        return str(self.user.username)

@receiver(post_save, sender=Post)
def create_post(sender, instance, created, **kwargs):
    if created:
        Profile.Manager(instance.user).add_post(instance)


# This function is used to create UserProfie object and Follow object of user
# # whenenver new user signup
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

# Singnal to call CREATE PROFILE method when new USER object is saved(SignUp) 
post_save.connect(create_profile, sender=User)