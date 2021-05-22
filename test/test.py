from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


def get_user(username):
    return User.objects.get(username=username)


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey('Post', on_delete=models.CASCADE)
    text = models.TextField()
    likes = models.ManyToManyField(User)
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
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    user_to = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    text = models.TextField()
    likes = models.ManyToManyField(User)

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
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    likes = models.ManyToManyField(User)
    comments = models.ManyToManyField(Comment)
    shares = models.ManyToManyField(User)
    saved = models.ManyToManyField(User)

    class Manager():
        def __init__(self, post):
            self.post = Post.objects.get(pk=post)

        def get_comment(self, comment):
            return Comment.objects.get(pk=comment)

        def add_like(self, username):
            user = get_user(username)
            self.post.likes.add(user)
            UserProfile.Manager(username).add_liked_post(self.post)
            self.post.save()

        def add_save(self, username):
            user = get_user(username)
            self.post.saved.add(user)
            UserProfile.Manager(username).add_saved_post(self.post)
            self.post.save()

        def add_comment(self, comment):
            self.post.comments.add(comment)
            self.post.save()


class Profile(models.Model):
    # Normal Details
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile = models.ImageField(upload_to='user_profile_image')
    cover = models.ImageField(upload_to='user_cover_image')
    bio = models.CharField(max_length=150)
    external_link = models.URLField(blank=True, default='')

    # Extra detail
    followers = models.ManyToManyField(User)
    followings = models.ManyToManyField(User)
    posts = models.ManyToManyField(Post)
    # TODO projects = models.ManyToManyField(Projects)

    # User Details for profile owners only
    liked_posts = models.ManyToManyField(Post)
    saved_posts = models.ManyToManyField(Post)

    # Is user Varified
    is_varified = models.BooleanField(default=False)

    class Manager():
        def __init__(self, username): # for make follower function
            self.user = UserProfile.objects.get(user=username)

        def add_post(self, post):
            self.user.posts.add(post)
            self.user.save()

        def add_saved_post(self,  post_id):
            post = Post.objects.get(pk=post_id)
            self.user.saved_posts.add(post)
            self.user.save()

        def add_liked_post(self, post_id):
            post = Post.objects.get(pk=post_id)
            self.user.liked_posts.add(post)
            self.user.save()

        def add_follower(self, follower):
            follower = UserProfile.objects.get(user=follower)
            self.user.followers.add(follower.user)
            follower.followings.add(self.user.user)
            self.user.save()
            follower.save()

        def change_varification(self, boolean_value):
            self.user.is_varified = boolean_value
            self.user.save()


@receiver(post_save, sender=Post)
def create_post(sender, instance, created, **kwargs):
    if created:
        UserProfile.Manager(instance.user).add_post(instance)


