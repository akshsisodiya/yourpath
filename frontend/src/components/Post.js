import React, {useState, useEffect, useRef, useContext} from 'react'
import CommentSection from './CommentSection'
import {UserContext} from '../App'
import useWindowDimensions from './windowDimension'

function PostTop({user, time}){
    const [postActionShow, setPostActionShow] = useState(false)
    const postActionRef = useRef()
    const postActionButton = useRef()
    useEffect(function(){
        if(postActionShow){
            document.addEventListener('mousedown', handleOutsideClick)
            return ()=> document.removeEventListener('mousedown',handleOutsideClick)
        }
    })
    function postActionClick(e){
        setPostActionShow(!postActionShow)
    }    
    function handleOutsideClick(e){
        if(!postActionRef.current.contains(e.target) && !postActionButton.current.contains(e.target)){            
            setPostActionShow(false)
        }
    }
    return(
        <div className="post-top">
            <div className="post-top-left">
                <a href={user.link}>
                    <img src={user.profile}
                        alt="" />
                </a>
                <div>
                    <a href={user.link}>
                        <h4>{user.full_name}</h4>
                    </a>
                    <h6>{time}</h6>
                </div>
            </div>
            <div className="post-top-right">
                <div className="post-actions-button" ref={postActionButton} onClick={postActionClick}>
                    <i className="fas fa-ellipsis-h" ></i>
                </div>
            {postActionShow && <PostActionContainer user={user} forwardedRef={postActionRef}/>}    
            </div>
        </div>
)
}

function PostActionContainer({user, forwardedRef}){
    return(
            <div className="post-actions-container" id='post-actions-container' ref={forwardedRef}> 
                <div className="post-actions">
                    <h6 className="post-action">{user.is_followed? "Unfollow":"Follow"}</h6>
                    <h6 className="post-action">Share profile</h6>
                    <h6 className="post-action">Report</h6>
                </div>
            </div>
    )
}

function PostMid({img, text}){
    return(
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

function PostBottom({likes, comments, shares, is_saved, is_liked}){

    const userDetail = useContext(UserContext)
    const { height, width } = useWindowDimensions();

    const [likesCount, setLikesCount] = useState(likes.count)
    const [commentsCount, setCommentsCount] = useState(comments.count)
    const [sharesCount, setSharesCount] = useState(shares.count)
    // const [likesList, setLikesList] = useState(likes.likes_list)
    const [isLiked, setIsLiked] = useState(is_liked)
    const [isSaved, setIsSaved] = useState(is_saved)
    // const [likesListShow, setLikesListShow] = useState(false)
    // const [sharesListShow, setSharesListShow] = useState(false)
    const [showComments, setShowComments] = useState(false)
    const username = userDetail.username

    // to prevent like call on intial rendering
    var initialRender = false
    useEffect(()=>{
        initialRender = true
    },[])

    // Like button 
    useEffect(()=>{
        if(initialRender){
            initialRender = false
        }
        else{
            isLiked ? ifLiked() : ifNotLiked()
        }
    },[isLiked])    

    // this code is not working
    function ifNotLiked(){
        setLikesCount(likesCount-1)
        // for(var i in likesList){
        //     if(likesList[i].username == username){                
        //         let new_list = likesList
        //         new_list.splice(i, 1)                
        //         setLikesList(new_list)
        //         break
        //     }
        // }
    }
    // some green color shit
    function ifLiked(){
        setLikesCount(likesCount+1)
        // const currentDate = new Date()
        // let new_list = userDetail
        // new_list.time = currentDate.getTime()
        // new_list=[new_list,...likesList]
        // setLikesList(new_list)
    }

    function postSave(e){
        setIsSaved(!isSaved)
    }

    function commentClick(e){
        setShowComments(!showComments)
    }
    function shareClick(e){
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
            <div className={isLiked? "post-like post-option active": "post-like post-option"} onClick={()=>{setIsLiked(!isLiked)}}>
                <i className={isLiked?"fas fa-thumbs-up":"far fa-thumbs-up"} onClick={iconClick} ></i>
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
            <div className={isSaved ? "post-save post-option active": "post-save post-option"} onClick={postSave}>
                <i className={isSaved ?"fas fa-bookmark":"far fa-bookmark"} onClick={iconClick}></i>
                {/* <!-- remove far & add fas --> */}
                <h6 onClick={iconClick}>Save</h6>
            </div>
        </div>
        { width>780 && <CommentSection comments={comments} showComments={showComments} />}
    </div> )
}

function Post({post}) {
    
    return (
        <div className="post">
            <PostTop user={post.user_detail} time={post.post_detail.time} />
            <PostMid img={post.post_detail.img} text={post.post_detail.text} />
            <PostBottom 
                likes={post.post_detail.likes} 
                comments={post.post_detail.comments}
                shares={post.post_detail.shares} 
                is_saved={post.post_detail.is_saved}
                is_liked={post.post_detail.is_liked}
            />
        </div>
    )
}

export default Post