import React, { useContext, useEffect, useState, useRef } from 'react'
import { UserContext } from '../App'
import './Notification.css'


function NotificationFregment({ image, text, time, is_seen, link }) {
    const [mainClassName, setMainClassName] = useState('col-12 notification-fregment ')
    useEffect(() => {
        setMainClassName(mainClassName + (!is_seen && 'unseen'))
    }, [])

    const [menuShow, setMenuShow] = useState(false)
    const optionMenuRef = useRef()
    const optionButtonRef = useRef()

    function OptionMenu({ forwardRef }) {
        return (
            <div className="border p-2 text-dark bg-white rounded shadow" ref={forwardRef} style={{ position: 'absolute', right: '30px', top: '60%', zIndex: '2' }}>
                <div className="d-flex align-items-center cursor-pointer">
                    <i className="fa fa-trash fa-2x mr-3" aria-hidden="true"></i>
                    <div>
                        <div style={{ fontSize: '1em', fontWeight: '500' }}>Delete</div>
                        <div style={{ fontSize: '0.7em', fontWeight: '500' }}>Delete this notification</div>
                    </div>
                </div>
            </div>
        )
    }
    useEffect(() => {
        if (menuShow) {
            document.addEventListener('mousedown', handleOutSideClick)
            return () => {
                document.removeEventListener('mousedown', handleOutSideClick)
            }
        }
    })
    function handleOutSideClick(e) {
        if (!optionMenuRef.current.contains(e.target) && !optionButtonRef.current.contains(e.target)) {
            setMenuShow(false)
        }
    }

    return (
        <div className={mainClassName}>
            <div className="p-3 row justify-content-between align-items-center" style={{ position: 'relative' }}>
                <div className="col-3 col-sm-2 cursor-pointer" >
                    <img src={image} className='img-fluid rounded-circle' alt="" />
                </div>
                <div className="col-8 col-sm-9 cursor-pointer" >
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id odit fugiat animi numquam dolor architecto.</p>
                </div>
                <div className="col-1 cursor-pointer" ref={optionButtonRef} onClick={() => { setMenuShow(!menuShow) }}>
                    <i className="fas fa-ellipsis-h fa-sm "></i>
                </div>
                {menuShow && <OptionMenu forwardRef={optionMenuRef} />}
                <span className='text-muted' style={{ fontSize: '0.8em', position: 'absolute', top: '10px', right: '20px' }}>2d</span>
            </div>
            <div style={{ borderBottom: '1px solid var(--theme-gray)' }}></div>
        </div>
    )
}
function Notfications() {
    const UserDetail = useContext(UserContext)
    return (
        <div className='container mt-3' id='notification'>
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 border rounded px-0">
                    <NotificationFregment is_seen={true} />
                    <NotificationFregment is_seen={false} />
                    <NotificationFregment image={UserDetail.profile} />
                    <NotificationFregment />
                </div>
            </div>
        </div>
    )
}

export default Notfications
