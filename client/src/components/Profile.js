import React, { useEffect, useState, useContext } from "react";
import { userContext } from "../App";

const Profile = () => {
  const [mypics, setPics] = useState([]);
  const { state, dispatch } = useContext(userContext);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined);
  useEffect(() => {
    fetch("/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        //console.log(result)
        setPics(result.myposts);
      });
  }, []);

  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "insta-clone");
      data.append("cloud_name", "cnq");
      fetch("https://api.cloudinary.com/v1_1/cnq/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          localStorage.setItem(
            "user",
            JSON.stringify({ ...state, pic: result.pic })
          );
          dispatch({ type: "UPDATEPIC", payload: result.pic });
          //window.location.reload()
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [image]);

  const updatePhoto = (file) => {
    setImage(file);
  };

  return (
    <div style={{ maxWidth: "550px", margin: "0px auto" }}>
      <div className="profile-vaala-div">
        <div>
          <img
            style={{ width: "160px", height: "160px", borderRadius: "80px" }}
            src={state ? JSON.parse(state).pic : "loading"}
            alt=""
          />
          <div className="file-field input-field">
            <div className="btn #64b5f6 blue lighten-2">
              <span>Update Avatar</span>
              <input
                type="file"
                onChange={(e) => updatePhoto(e.target.files[0])}
              />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>
        </div>
        <div>
          <h4>{state ? JSON.parse(state).name : "loading"}</h4>
          <h5>{state ? JSON.parse(state).email : "loading"}</h5>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "110%",
            }}
          ></div>
        </div>
      </div>
      <div className="gallery">
        {mypics.map((item) => {
          return (
            <img
              key={item._id}
              className="item"
              src={item.pic}
              alt={item.title}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
