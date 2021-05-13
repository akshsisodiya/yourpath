import React, { useContext, useState } from 'react'
import { UserContext } from '../App'
import './Chat.css'
import TextBar from '../components/TextBar'

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

function ChatArea() {
    const UserDetail = useContext(UserContext)
    const [msgInput, setMsgInput] = useState('')
    function sendFunction() {
        console.log('hel')
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

function MainMessageArea() {
    return (
        <div style={{ height: '70vh', overflowY: 'auto' }}></div>
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
