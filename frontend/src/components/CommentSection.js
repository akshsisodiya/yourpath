/* eslint-disable eqeqeq */
import React from 'react'
import './CommentSection.css'
import useWindowDimensions from './windowDimension'
import { useState, useEffect, useRef, useContext } from 'react';
// eslint-disable-next-line no-unused-vars
import {UserContext, MainContextStore} from '../App'


const CommentInputContext = React.createContext(null)

function CommentBar({commentInput, setCommentInput}){  
    const userDetail = useContext(UserContext)
    const postCommentButton = useRef()
    const {commentInputRef, replingTo,setReplingTo} = useContext(CommentInputContext)
    
    function postCommentButtonClick(e){
        if(commentInput != ""){
            console.log(commentInput)
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

function CommentArea({comments}) {

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

function Comment({comment}) {
    const [commentLikes, setCommentLikes] = useState(comment.likes.count)
    const [isLiked, setIsLiked] = useState(comment.is_liked)
    const [showReply, setShowReply] = useState(false)

    // eslint-disable-next-line no-unused-vars
    const {commentInputRef, replingTo,setReplingTo} = useContext(CommentInputContext) 

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
            isLiked ? setCommentLikes(commentLikes+1) : setCommentLikes(commentLikes-1)
        }
    },[isLiked]) 

    function commentLikeClick(e){
        setIsLiked(!isLiked)      
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
                    <a href={comment.link}><img src={comment.profile} alt=""/></a>
                </div>
                <div className="comment-body-right">
                    <div onClick={()=>{window.location = comment.link}} style={{cursor:'pointer'}} >{comment.full_name}</div>
                    <span>{comment.text} </span>
                    {(commentLikes>0) && <div className="show-likes">                        
                        <i className="fas fa-thumbs-up    "></i>
                        <span>{commentLikes}</span>
                    </div>}
                </div>
            </div>
            <div className="comment-action">
                <div className="comment-action-left">
                    <span>1h</span>
                    <span onClick={commentLikeClick} className={isLiked ? 'comment-like active': 'comment-like'} >Like</span>
                    <span onClick={replyClick} >Reply</span>
                    {(comment.replies.count>0) && <span className="view-replies" onClick={showReplyClick} >{comment.replies.count} Replies</span>}
                </div>
            </div>
            {showReply && <Replies replies={comment.replies.replies_list} />}
        </div>
    )
}

function Replies({replies}) {
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


function CommentSection({comments, showComments}) {
    const [commentInput, setCommentInput] = useState("")    
    // eslint-disable-next-line no-unused-vars
    const { height, width } = useWindowDimensions();
    const [replingTo, setReplingTo] = useState(null)    
    const CommentInputRef = useRef()
    // console.log(height,width)
    return ( 
        <CommentInputContext.Provider value={{commentInputRef:CommentInputRef, replingTo:replingTo, setReplingTo:setReplingTo}}>
            <div className="comment-se">
                {showComments && <CommentArea comments={comments} />}
                <CommentBar commentInput={commentInput} setCommentInput={setCommentInput} />
            </div>
        </CommentInputContext.Provider>      
    )
}

export default CommentSection
