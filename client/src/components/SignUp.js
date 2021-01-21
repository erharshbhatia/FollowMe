import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";

function SignUp() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined);

  useEffect(()=>{
    if(url) uploadFields()
  }, [url])

  const PostData = () => {
    if (image) {
      uploadAvatar()
    }
    else{
      uploadFields()
    }
  }

  const uploadAvatar = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "social-media");
    data.append("cloud_name", "socioimagecloud");
    fetch("https://api.cloudinary.com/v1_1/socioimagecloud/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
        console.log(data.url);
      })
      .catch((err) => console.log(err));

    //request to our server
  };
  const uploadFields = () => {
    if (!email || !password || !name) {
      return M.toast({ html: "Please add all the fields", classes: "rounded" });
    }
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      return M.toast({ html: "invalid email", classes: "rounded" });
    }
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name, //now this name is my state variable
        password: password,
        email: email,
        pic: url
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "rounded" });
        } else {
          M.toast({ html: data.message, classes: "rounded" });
          history.push("/signin");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="mycard">
      <div className="card  auth-card input-field">
        <h2>Follow Me</h2>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="file-field input-field">
          <div className="btn #64b5f6 blue lighten-2">
            <span>Upload Your Avatar</span>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
        <button
          className="btn waves-effect waves-light #64b5f6 blue lighten-2
          "
          onClick={() => PostData()}
        >
          Signup
        </button>
        <h5>
          <Link to="/signin"> Already have an account?</Link>
        </h5>
      </div>
    </div>
  );
}

export default SignUp;
