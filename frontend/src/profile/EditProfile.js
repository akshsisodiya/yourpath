import React from 'react'
import './EditProfile.css'

function EditProfile({ user }) {
    return (
        <div className='container'>
            <div className="row">
                <div className="col-lg-3 p-3">
                    <div className="rounded-circle profile-container">
                        <img src={user.profile} className='img-fluid' alt="" />
                        <div className='d-flex justify-content-center align-items-center'>
                            <i class="fas fa-edit text-white fa-2x"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile
