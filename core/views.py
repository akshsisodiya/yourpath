from django.shortcuts import render, HttpResponse
import json
from django.views.decorators.http import require_http_methods
from .models import Post,Profile,get_user, Comment
from django.contrib.auth.decorators import login_required
# Create your views here.

def index2(request,username):
    if request.user.is_authenticated:
        return render(request, 'index.html')
    else:
        return render(request, 'core/home.html')

def index(request):
    if request.user.is_authenticated:
        return render(request, 'index.html')
    else:
        return render(request, 'core/home.html')
    
@login_required(login_url='/auth/login/')
def addFollower(request,username):
    follower_obj = Profile.Manager(username=request.user)
    try:
        is_followed = True if Profile.objects.filter(user=request.user, followings__exact=get_user(username)) else False
        print(is_followed)
    except Exception as e:
        print("EXCEPTION: ",e)

    if is_followed:
        try:
            follower_obj.remove_follower(follower=get_user(username))
            is_followed = False
        except Exception as e:
            print(e)

    else:
        try:
            follower_obj.add_follower(follower=get_user(username))
            is_followed = True
        except Exception as e:
            print(e)

    resp = {
        'is_followed': is_followed,
    }
    r = json.dumps(resp)
    return HttpResponse(r, "application/json")

@login_required(login_url='/auth/login/')
def savePost(request,id):
    post = Post.Manager(post=id)
    is_saved = True if Post.objects.filter(id=id,saved__exact=request.user) else False

    if is_saved:
        try:
            post.remove_save(request.user.username)

        except Exception as e:
            print(e)
        is_saved = False
    else:
        try:
            post.add_save(request.user.username)
        except Exception as e:
            print(e)
        is_saved = True

    resp = {
        'is_saved': is_saved,
    }
    r = json.dumps(resp)
    return HttpResponse(r, "application/json")

@login_required(login_url='/auth/login/')
def addlike(request,id):
    post = Post.Manager(post=id)
    post_obj = Post.objects.get(id=id)
    print(Post.objects.get(id=id))
    is_liked = True if Post.objects.filter(id=id,likes__exact=request.user) else False

    if is_liked:
        try:
            post.dislike(username=request.user.username)
        except Exception as e:
            print("EXCEPTION: ",e)
        is_liked= False
    else:
        try:
            post.add_like(username=request.user.username)
        except Exception as e:
            print("EXCEPTION: ", e)
        is_liked= True

    resp = {
        'is_liked': is_liked,
        'count': post_obj.likes.count()
    }
    r = json.dumps(resp)
    return HttpResponse(r, "application/json")

# @login_required(login_url='/auth/login/')
def addComment(request, id):
    comment=Comment.objects.create(
                user=request.user,
                post=Post.objects.get(pk=id),
                text=request.GET.get('text')
            )
    comment.save()
    resp = {
        'id':comment.id,
        'comment':comment.text
    }
    r=json.dumps(resp)
    return HttpResponse(r,"application/json")

def addLikeToComment(request,id):
    comment = Comment.Manager(comment=id)
    is_comment_liked = True if Comment.objects.filter(id=id,likes__exact=request.user) else False

    if is_comment_liked:
        comment.dislike(username=request.user.username)
        is_comment_liked =False
    else:
        comment.add_like(username=request.user.username)
        is_comment_liked = True

    resp = {
        'is_liked': is_comment_liked,
        'count': Comment.objects.get(pk=id).likes.count()
    }
    r = json.dumps(resp)
    return HttpResponse(r, "application/json")

#@login_required(login_url='/auth/login/')
@require_http_methods(["DELETE"])
def deletePost(request,id):
    msg = ''
    try:
        Post.objects.get(
            pk=id,
            user=request.user,
        ).delete()
        msg ='Post Deleted'
    except:
        msg = "Error"

    resp ={
        'message' : msg
    }
    r = json.dumps(resp)
    return HttpResponse(r,'application/json')
