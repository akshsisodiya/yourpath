import React, { useState, useEffect, useRef, useContext } from "react";
import "./UploadPost.css";
import { UserContext } from "../App";
import axios from "axios";

function UploadPost() {
  const userDetail = useContext(UserContext);
  const [postCaption, setPostCaption] = useState(null);
  const [postImg, setPostImg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
  const csrftoken = getCookie("csrftoken");
  function handlePostUpload(e) {
    e.preventDefault();
    const data = new FormData();
    async function upload(data) {
      axios.defaults.xsrfCookieName = "csrftoken";
      axios.defaults.xsrfHeaderName = "X-CSRFToken";
      try {
        const resp = await axios.post("/api/post/", data, {
          "Content-Type": "multipart/form-data",
        });
        return resp;
      } catch (err) {
        return false;
      }
    }
    console.log(postImg.rowImage);
    if (postCaption != null && postCaption != "" && postImg != null) {
      // const data = {
      //     postimg: postImg.rowImage,
      //     caption: postCaption,
      //     csrfmiddlewaretoken: csrftoken
      // }
      // upload function
      data.append("postimg", postImg.rowImage);
      data.append("caption", postCaption);
      data.append("csrfmiddlewaretoken:", csrftoken);

      const res = upload(data);
      if (res) {
        setErrorMsg(["Posted Successfully"]);
        setPostCaption(null);
        setPostImg(null);
      } else {
        setErrorMsg(["Something went wrong, please try again never.."]);
      }
    } else {
      if (postImg != null) {
        errorMsg
          ? setErrorMsg(...errorMsg, "Please Upload Image")
          : setErrorMsg(["Please Upload Image"]);
      } else {
        errorMsg
          ? setErrorMsg(...errorMsg, "Please Add Caption")
          : setErrorMsg(["Please Add Caption"]);
      }
    }
  }
  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6 border rounded ">
          <div
            className="p-3 d-flex align-items-center"
            style={{ borderBottom: "1px solid var(--theme-gray)" }}
          >
            <img
              src={userDetail.profile}
              className="rounded-circle mr-3"
              width="40"
              height="40"
              alt=""
            />
            <h5 className="text-dark mb-0">{`${userDetail.user.first_name} ${userDetail.user.last_name}`}</h5>
          </div>
          <form action="" className="p-3" onSubmit={handlePostUpload}>
            <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
            <Text
              textAreaInput={postCaption}
              setTextAreaInput={setPostCaption}
            />
            <File file={postImg} setFile={setPostImg} />
            <button
              type="submit"
              className="btn rounded-pill text-white d-block mx-auto"
              style={{ backgroundColor: "var(--theme-blue)" }}
            >
              Upload Post
            </button>
          </form>
          {errorMsg &&
            errorMsg.map((msg) => {
              return <h5>{msg}</h5>;
            })}
        </div>
      </div>
    </div>
  );
}

function Text({ textAreaInput, setTextAreaInput }) {
  const textAreaRef = useRef();
  useEffect(() => {
    if (textAreaInput) {
      if (textAreaInput.length > 80) {
        textAreaRef.current.style.fontSize = "1em";
        textAreaRef.current.rows = 10;
      } else {
        textAreaRef.current.style.fontSize = "1.6em";
        textAreaRef.current.rows = 6;
      }
    }
  }, [textAreaInput]);
  return (
    <div className="p-2">
      <div class="form-group">
        <textarea
          ref={textAreaRef}
          required
          class="add-post-textarea w-100"
          onChange={(e) => {
            setTextAreaInput(e.target.value);
          }}
          value={textAreaInput}
          name="caption"
          id="caption"
          rows="10"
          placeholder="Type Something..."
        ></textarea>
      </div>
    </div>
  );
}

function File({ file, setFile }) {
  function FileSelector({ setFile }) {
    function handleFileChange(e) {
      setFile({
        url: URL.createObjectURL(e.target.files[0]),
        name: e.target.files[0].name,
        rowImage: e.target.files[0],
      });
    }
    return (
      <div>
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          accept="image/gif, image/jpeg, image/png"
          ref={formFile}
          className="d-none"
        />
        <div
          className="mb-3 p-2 border rounded d-flex justify-content-between align-items-center cursor-pointer"
          onClick={() => {
            formFile.current.click();
          }}
        >
          <div className="mx-2 text-dark" style={{ fontWeight: "500" }}>
            Add to your post
          </div>
          <i className="fas fa-images fa-lg text-success mx-2"></i>
        </div>
      </div>
    );
  }
  function FileShower({ file, setFile }) {
    return (
      <div className="row border rounded">
        <div className="col-3">
          <img src={file.url} className="img-fluid" alt="" />
        </div>
        <div className="col-8">
          <div>{file.name}</div>
        </div>
      </div>
    );
  }
  const formFile = useRef();
  return (
    <div>
      {file == null ? (
        <FileSelector file={file} setFile={setFile} />
      ) : (
        <FileShower file={file} setFile={setFile} />
      )}
    </div>
  );
}

export default UploadPost;
