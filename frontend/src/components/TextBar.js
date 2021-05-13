import {useRef, useEffect} from 'react'

export default function TextBar({input, setInput, placeHolder, sendFunction}){  
       
    const sendButton = useRef()
    
    function sendButtonClick(e){
        if(input != ""){
            console.log(input)
            sendFunction()
            setInput("")
        }
    }

    useEffect(()=>{
        if(input != ""){
            sendButton.current.className= "active"
        }
        else{
            sendButton.current.classList.remove("active")
        }
    },[input])

    return(
        <div className="comment-bar-main">
            <div className="comment-bar">
            <div className="comment-bar-left">
            {/* <a href="/">
                    <img src="https://media-exp1.licdn.com/dms/image/C5603AQFJz8FiY3lWXA/profile-displayphoto-shrink_800_800/0/1609861395191?e=1624492800&v=beta&t=I8KhD_rYunJydi6GxUk4P2PvKAQL5CikJh4_rQGI6cI"
                        alt="" />
                </a> */}
            </div>
            <div className="comment-bar-right">
                <input type="text" placeholder={placeHolder} value={input} onChange={e=>{setInput(e.target.value)}} onKeyUp={e=>{e.keyCode === 13 && sendButton.current.click()}} />
                <div ref={sendButton} onClickCapture={sendButtonClick}>
                <i className="fa fa-paper-plane" aria-hidden="true"></i>
                </div>
            </div>
            </div>
        </div>
    )
}