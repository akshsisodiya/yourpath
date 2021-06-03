/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useContext } from 'react'
import CommentSection from './CommentSection'
import { UserContext, MainContextStore } from '../App'
import useWindowDimensions from './windowDimension'
import SetProfilePic from '../components/SetProfilePic'
import { Link } from 'react-router-dom'

function PostTop({ user, time, me, profile }) {
    const [postActionShow, setPostActionShow] = useState(false)
    const postActionRef = useRef()
    const postActionButton = useRef()
    useEffect(function () {
        if (postActionShow) {
            document.addEventListener('mousedown', handleOutsideClick)
            return () => document.removeEventListener('mousedown', handleOutsideClick)
        }
    })
    function postActionClick(e) {
        setPostActionShow(!postActionShow)
    }
    function handleOutsideClick(e) {
        if (!postActionRef.current.contains(e.target) && !postActionButton.current.contains(e.target)) {
            setPostActionShow(false)
        }
    }
    return (
        <div className="post-top">
            <div className="post-top-left">
                <Link to={'/profile/' + user.user.username}>
                    <img src={profile}
                        alt="" />
                </Link>
                <div>
                    <Link to={'/profile/' + user.user.username}>
                        <h4>{user.user.first_name + ' ' + user.user.last_name}</h4>
                    </Link>
                    <h6>{time}</h6>
                </div>
            </div>
            <div className="post-top-right">
                <div className="post-actions-button" ref={postActionButton} onClick={postActionClick}>
                    <i className="fas fa-ellipsis-h" ></i>
                </div>
                {postActionShow && <PostActionContainer user={user.user} me={me} forwardedRef={postActionRef} />}
            </div>
        </div>
    )
}

function PostActionContainer({ user, forwardedRef, me }) {
    const [isFollowed, setIsFollowed] = useState(me.followers.map(follower=>{return follower.username===user.username}).includes(true))
    function follow() {
        setIsFollowed(!isFollowed)        
        fetch('/follow/' + user.username + '/')
    }
    return (
        <div className="post-actions-container" id='post-actions-container' ref={forwardedRef}>
            <div className="post-actions">
                <h6 className="post-action" onClick={follow} >{isFollowed ? "Unfollow" : "Follow"}</h6>
                <h6 className="post-action">Share profile</h6>
                <h6 className="post-action">Report</h6>
            </div>
        </div>
    )
}

function PostMid({ img, text }) {
    return (
        <div className="post-mid">
            <div className="post-mid-text">
                <p>{text}</p>
            </div>
            <div className="post-mid-img">
                <img src={img}
                    alt="" />
            </div>
        </div>
    )
}

function PostBottom({ id, likes, comments, shares, is_saved, is_liked, profile }) {

    const userDetail = useContext(UserContext)
    // eslint-disable-next-line no-unused-vars
    const { height, width } = useWindowDimensions();

    const [likesCount, setLikesCount] = useState(likes.length)
    // eslint-disable-next-line no-unused-vars
    const [commentsCount, setCommentsCount] = useState(comments.length)
    const [commentsState, setComments] = useState(comments)
    const [sharesCount] = useState(shares.length)
    // const [likesList, setLikesList] = useState(likes.likes_list)
    const [isLiked, setIsLiked] = useState(is_liked)
    const [isSaved, setIsSaved] = useState(is_saved)
    // const [likesListShow, setLikesListShow] = useState(false)
    // const [sharesListShow, setSharesListShow] = useState(false)
    const [showComments, setShowComments] = useState(false)
    const setAlertMessage = useContext(MainContextStore).setAlertMessage


    function likePost(e) {
        setIsLiked(!isLiked)
        setLikesCount(likesCount + (isLiked ? -1 : 1))
        fetch(`/add-like/${id}/`)
    }

    function postSave(e) {
        setIsSaved(!isSaved)
        fetch(`/save-post/${id}/`)
    }

    function commentClick(e) {
        if(commentsCount > 0){
            setShowComments(!showComments)
        }
    }
    
    function shareClick(e) {
        // postLike(e)
    }

    function iconClick(e) {
        e.target.parentNode.click()
        e.stopPropagation()
    }

    return (
        <div className="post-bottom">
            <div className="post-details">
                <h6 >{likesCount} likes</h6>
                <h6>{commentsCount} comments</h6>
                <h6>{sharesCount} shares</h6>
            </div>
            <div className="post-options">
                <div className={isLiked ? "post-like post-option active" : "post-like post-option"} onClick={likePost}>
                    <i className={isLiked ? "fas fa-thumbs-up" : "far fa-thumbs-up"} onClick={iconClick} ></i>
                    {/* <!-- remove far & add fas --> */}
                    <h6 onClick={iconClick}>Like</h6>
                </div>
                <div className="post-comment post-option" onClick={commentClick}>
                    <i className="fas fa-comment" onClick={iconClick}></i>
                    <h6 onClick={iconClick}>Comment</h6>
                </div>
                <div className="post-share post-option" onClick={shareClick}>
                    <i className="fas fa-share" onClick={iconClick}></i>
                    <h6 onClick={iconClick}>Share</h6>
                </div>
                <div className={isSaved ? "post-save post-option active" : "post-save post-option"} onClick={postSave}>
                    <i className={isSaved ? "fas fa-bookmark" : "far fa-bookmark"} onClick={iconClick}></i>
                    {/* <!-- remove far & add fas --> */}
                    <h6 onClick={iconClick}>Save</h6>
                </div>
            </div>
            { width > 780 && <CommentSection 
            comments={commentsState} 
            setComments={setComments} 
            showComments={showComments} 
            setShowComments={setShowComments} 
            postId={id}
            />}
        </div>)
}

function Post({ post }) {
    const userDetail = useContext(UserContext)

    const [profile, setProfile] = useState(null)
    
    useEffect(() => {
        post && SetProfilePic(profile, setProfile, post.user.username)
    }, [])

    function Empty(props) {
        let margin = props.m ? props.m : 'my-1'
        let padding = props.p ? props.p : 'py-1'
        let width = props.w ? props.w : null
        let count = props.rep ? parseInt(props.rep) : 1
        let classes = `bg-light rounded ${margin} ${padding}`
        let styles = width ? { width: width } : {}
        let list = []
        for (let i = 0; i < count; i++) {
            list.push(i)
        }
        return (
            <div>
                {
                    list.map(i => {
                        return <div key={i} className={classes}></div>
                    })
                }
            </div>
        )
    }
    return (
        <div className="post" style={{ position: 'relative' }}>
            {post ? <PostTop user={post} me={userDetail} time={post.post_time_stamp} profile={profile} /> : <Empty m='mb-5' p='py-4' />}
            {post ? <PostMid img={post.post_img} text={post.text} /> : <Empty m='mb-3' p='py-2' rep='3' />}

            {post ? <PostBottom
                id={post.id}
                likes={post.likes}
                comments={post.comments}
                shares={post.shares}
                is_saved={post.saved.map(user => { return user.username === userDetail.user.username }).includes(true)}
                is_liked={post.likes.map(user => { return user.username === userDetail.user.username }).includes(true)}
                profile={profile}
            /> : <Empty m='mt-5' p='py-4' />}
        </div>
    )
}

export default Post