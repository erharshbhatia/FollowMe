import React, {useState, useEffect} from "react";
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'


function CreatePost() {
  const history = useHistory();
  const [title, setTitle]=useState("");
  const [body, setBody]=useState("");
  const [image, setImage]=useState("");
  const [url, setUrl]=useState("");

  useEffect(()=>{
    if(url){
    fetch('/createpost', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        title: title,
        body: body,
        pic: url
      })})
      .then(res=>res.json())
      .then(data=>{
        console.log(data)
        if(data.error){
          M.toast({html: data.error, classes: 'rounded'})
        }
        else{
          M.toast({html: "Created post success", classes: 'rounded'})
          history.push('/')
        }
      })
      .catch(err=>console.log(err))}
  }, [url])


  const postDetails=()=>{

    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "social-media")
    data.append("cloud_name", "socioimagecloud")
    fetch('https://api.cloudinary.com/v1_1/socioimagecloud/image/upload',{
      method: "POST",
      body: data
    })
    .then(res=>res.json())
    .then(data=>{
      
      setUrl(data.url)
      console.log(data.url)
    })
    .catch(err=>console.log(err))

    //request to our server
   


  }


  return (
    <div className="auth-card card input-field">
      <input type="text" 
      value={title} placeholder="title"
      onChange={e=>setTitle(e.target.value)} />
      <input type="text" placeholder="body"
      value={body}
      onChange={e=>setBody(e.target.value)} />

      

      <div className="file-field input-field">
        <div className="btn #64b5f6 blue lighten-2">
          <span>File</span>
          <input type="file"  onChange={e=>setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button onClick={()=>postDetails()} className="btn waves-effect waves-light #64b5f6 blue lighten-2">Submit post</button>
    </div>
  );
}

export default CreatePost;
