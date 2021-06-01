import React from 'react'

function AlertMessage({ message, setMessage }) {
    const css = {
        position: 'fixed',
        bottom: '20px',
    }
    setTimeout(() => { setMessage(false) }, 3000)
    if (message) {
        return (
            <div style={css} className='d-flex justify-content-center align-items-center'>
                <h5 className='p-3'>{message}</h5>
            </div>
        )
    } else {
        return null
    }
}

export default AlertMessage