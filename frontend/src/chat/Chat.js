import React, { Children, useContext, useState } from 'react'
import { UserContext } from '../App'
import './Chat.css'
import TextBar from '../components/TextBar'

// SideBar of chat app
function ChatList() {
    const UserDetail = useContext(UserContext)
    function ChatListFregment({ profile }) {
        return (
            <div className="w-100">
                <div className="row align-items-center chat-list-fregment py-2">
                    <div className="col-3">
                        <img src={profile} height='40px' width='40px' alt="" className="rounded-circle" />
                    </div>
                    <div className="col-8">
                        <h6 className='mb-1 '>Antariksh Sisodiya</h6>
                        <p className='mb-0' style={{ fontSize: '0.7em', fontWeight: '500' }}>This is last message</p>
                    </div>
                </div>
                <div style={{ borderBottom: '1px solid var(--theme-gray)' }}></div>
            </div>
        )
    }
    return (
        <div className="px-3 border rounded">
            <ChatListFregment profile={UserDetail.profile} />
            <ChatListFregment profile={UserDetail.profile} />
            <ChatListFregment profile={UserDetail.profile} />
            <ChatListFregment profile={UserDetail.profile} />
            <ChatListFregment profile={UserDetail.profile} />
        </div>
    )
}

// Fundamentals of Main Chatting area
function ChatArea() {
    const UserDetail = useContext(UserContext)
    const [msgInput, setMsgInput] = useState('')
    function sendFunction() {
        console.log(msgInput)
    }
    function ChatTop() {
        return (
            <div style={{ borderBottom: '1px solid var(--theme-gray)' }}>
                <div className="p-3 d-flex align-items-center">
                    <div className="mr-3">
                        <img src={UserDetail.profile} height='40px' width='40px' alt="" className="rounded-circle" />
                    </div>
                    <h6>Antariksh Sisodiya</h6>
                </div>
            </div>
        )
    }

    return (
        <div className="w-100 border">
            <ChatTop />
            <MainMessageArea />
            <div style={{ borderTop: '1px solid var(--theme-gray)' }}>
                <TextBar input={msgInput} placeHolder={'Type Something...'} sendFunction={sendFunction} setInput={setMsgInput} />
            </div>
        </div>
    )
}

// Main message area including message fregments
function MainMessageArea() {
    const userDetail = useContext(UserContext)
    function Message({ msgType, children }) {
        const flexDir = msgType == 'send' ? 'row' : 'row-reverse'
        return (
            <div className="w-100 px-3 py-1 d-flex justify-content-end align-items-start" style={{ flexDirection: flexDir }}>
                <div className='msg-fregment-container'>
                    <div className="mx-2 msg-fregment">
                        <div className="py-2 px-4">
                            {children}
                        </div>
                    </div>
                    <div className="mx-3 mt-1 text-muted d-flex justify-content-end" style={{ fontSize: '0.7em', flexDirection: flexDir }}>
                        <span>14:29 pm</span>
                    </div>
                </div>
                <img src={userDetail.profile} style={{ objectFit: 'cover' }} className="rounded-circle" height='40px' width='40px' />
            </div>
        )
    }

    return (
        <div className='py-2' style={{ height: '70vh', overflowY: 'auto' }}>
            <Message msgType='send'>Hello!</Message>
            <Message msgType='revieve'>Hi</Message>
            <Message msgType='send'>test?</Message>
            <Message msgType='revieve'>working fine.. </Message>
            <Message msgType='send'>and UI?</Message>
            <Message msgType='revieve'>Cool</Message>
            <Message msgType='send'>tnx</Message>
            <Message msgType='send'>thanks</Message>
            <Message msgType='send'>thnx</Message>
            <Message msgType='send'>thanex</Message>
            <Message msgType='revieve'>Bye!!!!!</Message>
        </div>
    )
}


function Chat() {
    return (
        <div className='container mt-3' id='chat'>
            <div className="row">
                <div className="col-3 px-0">
                    <ChatList />
                </div>
                <div className="col-9">
                    <ChatArea />
                </div>
            </div>
        </div>
    )
}

export default Chat
