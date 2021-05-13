from django.db import models

class User(models.Model):
    username = models.CharField(unique=True)
    posts = models.ManyToManyField(Post)
    liked_posts = models.ManyToManyField(Post)
    saved_posts = models.ManyToManyField(Post)

class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    likes = models.ManyToManyField(User)
    comments = models.ManyToManyField(Comment)
    shares = models.ManyToManyField(User)
    saved = models.ManyToManyField(User)

    def save(self, *args, **kwargs):
        userClassObject = User.objects.get(pk=self.user.pk)
        userClassObject.posts.add(self)
        super(Post, self).save(*args, **kwargs)

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    text = models.TextField()
    likes = models.ManyToManyField(User)
    replies = models.ManyToManyField(Reply)

    def save(self, *args, **kwargs):
        postClassObject = Post.objects.get(pk=self.post.pk)
        postClassObject.comments.add(self)
        super(Comment, self).save(*args, **kwargs)

class Reply(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    user_to = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    text = models.TextField()
    likes = models.ManyToManyField(User)

    def save(self, *args, **kwargs):
        commentClassObject = Comment(pk=self.comment.pk)
        commentClassObject.replies.add(self)
        super(Reply, self).save(*args, **kwargs)

################################################
#                   METHODS                    #
################################################

def create_post(user, text):
    postClassObject = Post(user=user, text=text)
    postClassObject.save()

def add_like_post(post, user):
    #add user to post class
    postClassObject = Post.objects.get(pk=post)
    postClassObject.likes.add(user)
    #add post to user class
    userClassObject = User.objects.get(pk=user)
    userClassObject.liked_posts.add(post)
    #save
    postClassObject.save()
    userClassObject.save()

def save_post(post, user):
    #add user to post class
    postClassObject = Post.objects.get(pk=post)
    postClassObject.saved.add(user)
    #add post to user class
    userClassObject = User.objects.get(pk=user)
    userClassObject.saved_posts.add(post)
    #save
    postClassObject.save()
    userClassObject.save()

def add_comment(user, post, text):
    commentClassObject = Comment(user, post, text)
    commentClassObject.save()

def add_comment_like(user, comment):
    commentClassObject = Comment.objects.get(pk=comment)
    commentClassObject.likes.add(user)
    commentClassObject.save()

def add_reply(user, user_to, comment, text):
    replyClassObject = Reply(user, user_to, comment, text)
    replyClassObject.save()

def add_reply_like(user, comment):
    replyClassObject = Reply.objects.get(pk=comment)
    replyClassObject.likes.add(user)
    replyClassObject.save()