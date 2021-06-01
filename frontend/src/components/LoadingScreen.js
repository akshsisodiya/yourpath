import React from 'react'

function LoadingScreen(props) {
    var height = props.height ? props.height : '90vh'
    var id = props.id ? props.id : 'loading-spinner'
    return (
        <div className="d-flex justify-content-center align-items-center p-3" id={id} style={{ height: height }}>
            <div className="spinner-border"></div>
        </div>
    )
}

export default LoadingScreen
