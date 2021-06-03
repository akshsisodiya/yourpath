/* eslint-disable eqeqeq */
import React from 'react'
import './CommentSection.css'
import useWindowDimensions from './windowDimension'
import { useState, useEffect, useRef, useContext } from 'react';
// eslint-disable-next-line no-unused-vars
import {UserContext, MainContextStore} from '../App'
import SetProfilePic from './SetProfilePic'
import axios from 'axios';


const CommentInputContext = React.createContext(null)

function CommentBar({commentInput, setCommentInput, comments, setComments, postId}){  
    const userDetail = useContext(UserContext)
    const postCommentButton = useRef()
    const {commentInputRef, replingTo,setReplingTo} = useContext(CommentInputContext)
    
    function postCommentButtonClick(){
        if(commentInput != ""){
            const commentData = {
                user:userDetail.user,
                text:commentInput,
                likes:[]
            }
            setComments(comments.concat(commentData))
            const postComment = async (id, text) =>{
                const params = {
                    method: 'get',
                    url: `/add-comment/${id}/?text=${text}`
                }
                const res = await axios(params)
                console.log(res.data);
            }            
            postComment(postId, commentInput)
            setCommentInput("")
        }
    }

    useEffect(()=>{
        if(commentInput != ""){
            postCommentButton.current.className= "active"
        }
        else{
            postCommentButton.current.classList.remove("active")
        }
    },[commentInput])

    return(
        <div className="comment-bar-main">
            {(replingTo != null) && <div>Repling to <span className="ml-1">{replingTo.full_name}</span><span style={{marginLeft:'30px', fontWeight:500, cursor:'pointer'}} onClick={()=>{setReplingTo(null)}} >Cancel</span></div>}
            <div className="comment-bar">
            <div className="comment-bar-left"> 
            <a href="/">
                    <img src={userDetail.profile}
                        alt="" />
                </a>
            </div>
            <div className="comment-bar-right">
                <input type="text" placeholder="Write a comment" ref={commentInputRef} value={commentInput} onChange={e=>{setCommentInput(e.target.value)}} onKeyUp={e=>{e.keyCode === 13 && postCommentButton.current.click()}} />
                <div ref={postCommentButton} onClickCapture={postCommentButtonClick}>
                <i className="fa fa-paper-plane" aria-hidden="true"></i>
                </div>
            </div>
            </div>
        </div>
    )
}

function CommentSection({comments, setComments, showComments, postId}) {
    const [commentInput, setCommentInput] = useState("")    
    // eslint-disable-next-line no-unused-vars
    const { height, width } = useWindowDimensions();
    const [replingTo, setReplingTo] = useState(null)    
    const CommentInputRef = useRef()
    // console.log(height,width)


    function CommentArea({comments}) {

        function Comment({comment}) {
            const me = useContext(UserContext)
            
            const [isLiked, setIsLiked] = useState(comment.likes.map(like=>like.username==me.user.username).includes(true))
            const [likesCount, setLikesCount] = useState(comment.likes.length)
            const [showReply, setShowReply] = useState(false)
            // const [replyCount, setReplyCount] = useState(comment.replies.length)
            
            useEffect(() => {
                SetProfilePic(profile, setProfile, comment.user.username)
            }, [])
        
            // eslint-disable-next-line no-unused-vars
            const {commentInputRef, replingTo,setReplingTo} = useContext(CommentInputContext) 
        
            const [profile, setProfile] = useState(null)
            
        
            function commentLikeClick(e){
                setIsLiked(!isLiked)
                setLikesCount(likesCount + (isLiked ? -1:1))

                // sets temporary variable for comments state
                let newComments = comments
                // finds index of targeted comment all comments
                let thisComment_index = newComments.indexOf(newComments.find(c=>c.id==comment.id))
                // if userdisliked
                if(isLiked){
                    // finds current user in targeted comments's likes
                    let userIn_thisComment_likes = newComments[thisComment_index].likes.find(u=>u.username==me.user.username)
                    // retrives index of current user in targeted comment's likes
                    let thisLike_index = newComments[thisComment_index].likes.indexOf(userIn_thisComment_likes)
                    // deletes current user in targeted comment's likes
                    newComments[thisComment_index].likes.splice(thisLike_index,1)
                }else{
                    // adds user in targeted comments likes
                    newComments[thisComment_index].likes.push(me.user)
                }                
                setComments(newComments)
                async function likeComment(){
                    const res = await fetch(`/add-comment-like/${comment.id}/`)
                    const data = await res.json()                    
                    return data            
                }
                
                likeComment()      
            }
        
            function showReplyClick(){
                setShowReply(!showReply)
            }
        
            function replyClick(e) {
                commentInputRef.current.focus()
                setReplingTo(comment)
            }    
        
            return(
                <div className="comment">
                    <div className="comment-body">
                        <div className="comment-body-left">
                            <a href={`/profile/${comment.user.username}`}><img src={profile} alt=""/></a>
                        </div>
                        <div className="comment-body-right">
                            <div onClick={()=>{window.location = `/profile/${comment.user.username}`}} style={{cursor:'pointer'}} >{comment.user.first_name} {comment.user.last_name}</div>
                            <span>{comment.text} </span>
                            {(likesCount>0) && <div className="show-likes">                        
                                <i className="fas fa-thumbs-up    "></i>
                                <span>{likesCount}</span>
                            </div>}
                        </div>
                    </div>
                    <div className="comment-action">
                        <div className="comment-action-left">
                            <span>1h</span>
                            <span onClick={commentLikeClick} className={isLiked ? 'comment-like active': 'comment-like'} >Like</span>
                            <span onClick={replyClick} >Reply</span>
                            {/* {(comment.replies.count>0) && <span className="view-replies" onClick={showReplyClick} >{comment.replies.count} Replies</span>} */}
                        </div>
                    </div>
                    {/* {showReply && <Replies replies={comment.replies.replies_list} />} */}
                </div>
            )
        }

        const commentArea = useRef()
    
        useEffect(() => {
            commentArea.current.className = "comment-area active"
        }, [])
    
        return(
            <div className="comment-area" ref={commentArea}>
                {comments.map((comment) => {return <Comment comment={comment} key={comment.id} />} )}
            </div>
        )
    }    
    
    function Replies({replies}) {

        function Reply({reply}) {
            const [replyLikes, setReplyLikes] = useState(reply.likes.count)
            const [isLiked, setIsLiked] = useState(reply.is_liked)
            var initialRender = false
            useEffect(()=>{
                // eslint-disable-next-line react-hooks/exhaustive-deps
                initialRender = true
            },[])
        
            // Like button 
            useEffect(()=>{
                if(initialRender){
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    initialRender = false
                }
                else{
                    isLiked ? setReplyLikes(replyLikes+1) : setReplyLikes(replyLikes-1)
                }
            },[isLiked]) 
        
            function replyLikeClick(e){
                setIsLiked(!isLiked)     
            }
        
            return(
                <div className="reply">
                <div className="comment-body">
                    <div className="comment-body-left">
                        <a href={reply.link}>
                            <img src={reply.profile} alt=""/>
                        </a>
                    </div>
                    <div className="comment-body-right">
                        <div onClick={()=>{window.location = reply.link}} style={{cursor:'pointer'}} >{reply.full_name}</div>
                        <span><strong onClick={()=>{window.location = reply.to.link}} style={{cursor:'pointer', fontWeight:600, color:'var(--theme-blue)' }} >{reply.to.full_name}</strong> {reply.text}</span>
                        {(replyLikes>0) && <div className="show-likes">                        
                                <i className="fas fa-thumbs-up    "></i>
                                <span>{replyLikes}</span>
                            </div>} 
                    </div>
                </div>
                <div className="comment-action">
                        <div className="comment-action-left">
                            <span>1h</span>
                            <span onClick={replyLikeClick} className={isLiked?'comment-like active':'comment-like'} >Like</span>
                            <span>Reply</span>                                       
                        </div>
                    </div> 
            </div>
        
            )
        }
        return (
            <div className="replies-section">
                {
                    replies.map(function(reply){
                        return <Reply reply={reply} key={reply.id} />
                    })
                }
            </div>
        )
    }
        



    return ( 
        <CommentInputContext.Provider value={{commentInputRef:CommentInputRef, replingTo:replingTo, setReplingTo:setReplingTo}}>
            <div className="comment-se">
                {showComments && <CommentArea comments={comments} />}
                <CommentBar 
                commentInput={commentInput} 
                setCommentInput={setCommentInput}
                comments={comments} 
                setComments={setComments} 
                postId={postId}
                />
            </div>
        </CommentInputContext.Provider>      
    )
}

export default CommentSection
