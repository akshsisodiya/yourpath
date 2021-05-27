import React from 'react'

function LoadingScreen(props) {
    var height = props.height ? props.height : '90vh'
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: height }}>
            <div className="spinner-border"></div>
        </div>
    )
}

export default LoadingScreen
