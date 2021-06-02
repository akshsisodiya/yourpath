import React from 'react'

function AlertMessage() {
    let message = ""

    const css = {
        position: 'fixed',
        bottom: '20px',
        display: 'hidden'
    }
    

    if (message) {
        return (
            <div style={css} id='alert-message-component' className='d-flex justify-content-center align-items-center'>
                <h5 className='p-3'>{message}</h5>
            </div>
        )
    } else {
        return null
    }
}
export function AlertMessageSend(message){
    let el = document.getElementById('alert-message-component')
    el.innerText = message
    el.style.display = 'block'
    setTimeout(() => { el.style.display='none' }, 3000)
}

export default AlertMessage