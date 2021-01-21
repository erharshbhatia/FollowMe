import React, {useEffect, useState, useContext} from "react";
import {userContext} from '../App'
import {useParams} from 'react-router-dom'




const Profile=()=> {
const [userProfile , setProfile] = useState(null)
const {state, dispatch}=useContext(userContext)
const {userid}=useParams()
const [showfollow, setShowFollow] = useState(true)
//console.log(userid)
useEffect(()=>{
    fetch(`/user/${userid}`,{
        headers:{
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        }
    })
    .then(res=>res.json())
    .then(result=>{
        console.log(result)
        
        setProfile(result)
    })
 },[])
 //5f67905c685c9927f4c64228
 //5f68469c6b1f3a3b702de89b
 const followUser = ()=>{
  fetch('/follow',{
      method:"put",
      headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem('jwt')
      },
      body:JSON.stringify({
          toFollowId:userid
      })
  }).then(res=>res.json())
  .then(data=>{
  
      dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
       localStorage.setItem("user",JSON.stringify(data))
       setProfile((prevState)=>{
           return {
               ...prevState,
               user:{
                   ...prevState.user,
                   followers:[...prevState.user.followers,data._id]
                  }
           }
       })
       setShowFollow(false)
  })
}
const unfollowUser = ()=>{
  fetch('/unfollow',{
      method:"put",
      headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem('jwt')
      },
      body:JSON.stringify({
        toUnfollowId:userid
      })
  }).then(res=>res.json())
  .then(data=>{
      
      dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
       localStorage.setItem("user",JSON.stringify(data))
      
       setProfile((prevState)=>{
          const newFollower = prevState.user.followers.filter(item=>item != data._id )
           return {
               ...prevState,
               user:{
                   ...prevState.user,
                   followers:newFollower
                  }
           }
       })
       setShowFollow(true)
       
  })
}
  return (
      <>
      {userProfile?

        <div style={{ maxWidth: "550px", margin: "0px auto"}}>
      <div className="profile-vaala-div">
        <div>
          <img
            style={{ width: "160px", height: "160px", borderRadius: "80px" }}
            src={userProfile.user.pic}
            alt=""
          />
        </div>
        <div>
          <h4>{userProfile.user.name}</h4>
          <h5>{userProfile.user.email}</h5>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "110%",
            }}
          >
            <h5>{userProfile.posts.length} posts</h5>
            <h5>{userProfile.user.followers.length} followers</h5>
            <h5>{userProfile.user.following.length} following</h5>
          </div>
          {(showfollow)?
          <button
          className="btn waves-effect waves-light #64b5f6 blue lighten-2
          " onClick={()=>followUser()}>
         Follow
        </button>:
        <button
          className="btn waves-effect waves-light #64b5f6 blue lighten-2
          " onClick={()=>unfollowUser()}>
         Unfollow
        </button>}
          
        </div>
      </div>
      <div className='gallery'>
      {
        userProfile.posts.map(item=>{
          return(
            <img key={item._id} className='item' src={item.pic} alt={item.title}/>
          )
        })
      }
      
     
      </div>
    </div>
    : <h2>Loading...</h2>
    }
    
    </>
  );
  
}

export default Profile;
