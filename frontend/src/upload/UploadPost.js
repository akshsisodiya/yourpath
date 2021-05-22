import React, { useState, useEffect, useRef, useContext } from 'react'
import './UploadPost.css'
import { UserContext } from '../App'

function UploadPost() {
    const userDetail = useContext(UserContext)

    return (
        <div className="container mt-3">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6 border rounded ">
                    <div className="p-3 d-flex align-items-center" style={{ borderBottom: '1px solid var(--theme-gray)' }}>
                        <img src={userDetail.profile} className='rounded-circle mr-3' width='40' height='40' alt="" />
                        <h5 className='text-dark mb-0'>{userDetail.full_name}</h5>
                    </div>
                    <form action="" className="p-3">
                        <Text />
                        <File />
                        <button className="btn rounded-pill text-white d-block mx-auto" style={{ backgroundColor: 'var(--theme-blue)' }}>Upload Post</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

function Text() {
    const textAreaRef = useRef()
    const [textAreaInput, setTextAreaInput] = useState("")
    useEffect(() => {
        if (textAreaInput.length > 80) {
            textAreaRef.current.style.fontSize = '1em'
            textAreaRef.current.rows = 10
        } else {
            textAreaRef.current.style.fontSize = '1.6em'
            textAreaRef.current.rows = 6
        }

    }, [textAreaInput])
    return (
        <div className="p-2">
            <div class="form-group">
                <textarea ref={textAreaRef} class="add-post-textarea w-100" onChange={e => { setTextAreaInput(e.target.value) }} value={textAreaInput} name="caption" id="caption" rows='10' placeholder='Type Something...' ></textarea>
            </div>
        </div>
    )
}

function File() {
    function FileSelector({ setFile }) {
        function handleFileChange(e) {
            setFile({ url: URL.createObjectURL(e.target.files[0]), name: e.target.files[0].name })
        }
        return (
            <div>
                <input type="file" name='image' onChange={handleFileChange} accept="image/gif, image/jpeg, image/png" ref={formFile} className='d-none' />
                <div className="mb-3 p-2 border rounded d-flex justify-content-between align-items-center cursor-pointer" onClick={() => { formFile.current.click() }}>
                    <div className='mx-2 text-dark' style={{ fontWeight: '500' }}>Add to your post</div>
                    <i className="fas fa-images fa-lg text-success mx-2"></i>
                </div>
            </div>
        )
    }
    function FileShower({ file, setFile }) {
        return (
            <div className='row border rounded'>
                <div className="col-3">
                    <img src={file.url} className='img-fluid' alt="" />
                </div>
                <div className="col-8">
                    <div>{file.name}</div>
                </div>
                <div onClick={setFile(null)} className="col-1"><i className="fa fa-times" aria-hidden="true"></i></div>
            </div>
        )
    }
    const formFile = useRef()
    const [file, setFile] = useState(null)
    return (
        <div>
            {file == null ? <FileSelector file={file} setFile={setFile} /> : <FileShower file={file} setFile={setFile} />}
        </div>
    )
}

export default UploadPost
