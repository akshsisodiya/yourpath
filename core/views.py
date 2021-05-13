from django.shortcuts import render, redirect, HttpResponse
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.contrib.auth.models import User
from .models import UserPost, UserProfile, Followed, Like
from numerize import numerize

import json

# TODO pwd = PDPwsrTazRN2PMh

def index(request):
    if request.user.is_authenticated:
        return render(request, 'index.html')
    return render(request, 'core/home.html')
# Create your views here.
def feed(request):
    if request.user.is_authenticated:

        current_user = Followed.objects.get(user=request.user)
        followed_user = [i for i in current_user.followed.all()]
        post = UserPost.objects.filter(user__in=followed_user).order_by('-pk')
        liked = [i for i in post if Like.objects.filter(
                                                        post=i,
                                                        user=request.user)]
        likes = []
        for i in post:
            try:
                likes.append(Like.objects.get(post=i).user.count())
            except Exception:
                likes.append(0)

        return render(
            request,
            'core/feed.html',
            {
                'user_data': zip(post, likes),
                'liked': liked, 'likes': likes
            })
    else:
        return render(request, 'index.html')


@require_http_methods(['POST'])
def UploadPost(request):
    image = request.FILES['post-image']
    caption = request.POST.get('caption')
    user = User.objects.get(username=request.user.username)
    post = UserPost.objects.create(
        user=user,
        post_image=image,
        post_caption=caption
    )
    post.save()
    return redirect('/')


def profile(request, username):

    user = User.objects.get(username=username)
    follow_obj = Followed.objects.get(user=user)
    print(user.username)
    data = UserProfile.objects.get(user=user)
    is_following = Followed.objects.filter(user=request.user, followed=user)
    user_details = {
        'username': username,
        'user_profile_img': data.user_image.url,
        'user_follower_count': numerize.numerize(follow_obj.follower.count()),
        'user_following_count': numerize.numerize(follow_obj.followed.count()),
        'user_total_post': numerize.numerize(get_post_link(user)[1]),
        'user_bio': data.user_bio,
        'post': get_post_link(user)[0],
        'relation': is_following

    }

    return render(request, 'core/profile.html', {'userdata': user_details})


def searchUser(request):
    li = []
    if request.is_ajax():
        user = User.objects.filter(
            username__startswith=request.POST.get(
                'term'
            )).exclude(
                username="admin"
                ).exclude(username=request.user.username)
        # return JsonResponse(user)
        for i in user:
            li.append(i.username)

        return JsonResponse(li, safe=False)


def follow(request, username):
    user = request.user
    to_follow = User.objects.get(username=username)
    user_profile = UserProfile.objects.get(user=user)
    obj = Followed.objects.filter(user=user, followed=to_follow)

    is_following = True if obj else False

    if is_following:
        Followed.unfollow(user, to_follow)
        print("FOLLOWER:", type(user_profile.user_follower))
        is_following = False
    else:
        Followed.follow(user, to_follow)
        is_following = True

    response = {
        'Following': is_following
    }
    resp = json.dumps(response)
    return HttpResponse(resp, content_type="application/json")


def LikePost(request, id):

    user = request.user
    post = UserPost.objects.get(pk=id)
    print("POST CAPTION", post.post_caption)
    obj = Like.objects.filter(user=user, post=post)

    is_liked = True if obj else False

    if is_liked:

        Like.dislike(post, user)
        is_liked = False
        try:
            obj2 = Like.objects.get(post=post)
            print("LIKES:", obj2.user.count())
        except Exception:
            # Some shity debugging
            print("Websocket needed")

    else:

        Like.liked(post, user)
        is_liked = True
        try:
            obj2 = Like.objects.get(post=post)
            print("LIKES:", obj2.user.count())
        except Exception:
            # Again Some shity debugging
            print("Websocket needed")
    response = {
        'is_liked': is_liked,
        'likes': obj2.user.count()
    }
    resp = json.dumps(response)
    return HttpResponse(resp, content_type='application/json')

# Function to get all post image links of user


def get_post_link(user):
    post_img_link = []
    total_no = None
    post = UserPost.objects.filter(user=user).order_by('-id')
    likes = []
    for i in post:
        post_img_link.append(i.post_image.url)
        try:
            likes.append(Like.objects.get(post=i).user.count())
        except Exception:
            likes.append(0)
        total_no = len(post_img_link)
    return [zip(post_img_link, likes), total_no]
