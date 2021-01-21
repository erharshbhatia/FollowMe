import React, {useState, useContext} from "react";
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'
import {userContext} from '../App'
function Signin() {
const {state, dispatch} = useContext(userContext)
const history = useHistory()


const [password, setPassword] = useState("");
const [email, setEmail] = useState("");

const PostData = ()=>{
  if(!email || !password){
    return M.toast({html: "Please add all the fields", classes: 'rounded'})
  }
  if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
    return M.toast({html: "invalid email", classes: 'rounded'})
  }
  fetch('/signin', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      
      password: password,
      email: email
    })})
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      if(data.error){
        M.toast({html: data.error, classes: 'rounded'})
      }
      else{
        localStorage.setItem('jwt', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        dispatch({type: "USER", payload: data.user})
        M.toast({html: "signedin success", classes: 'rounded'})
        history.push('/')
      }
    })
    .catch(err=>console.log(err))
}
  return (
    <div className="mycard">
      <div className="card  auth-card input-field">
        <h2>Follow Me</h2>
        <input type="text" placeholder="email" 
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />
        <input type="password" placeholder="password" 
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />
        <button
          className="btn waves-effect waves-light #64b5f6 blue lighten-2
          " onClick={()=>PostData()}>
         Signin
        </button>
        <h5><Link to='/signup'> Don't have an account?</Link></h5>
      </div>
    </div>
  );
}

export default Signin;
