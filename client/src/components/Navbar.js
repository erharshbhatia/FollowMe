import React, {useContext} from "react";
import {Link, useHistory} from 'react-router-dom'
import {userContext} from '../App'

function Navbar() {
  const {state, dispatch} = useContext(userContext)
 // const history=useHistory()
  const renderList=()=>{
    if(state){
      return [
        <li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/createpost">Create Post</Link></li>,
        <li><Link to="/myfollowingpost">My following post</Link></li>,
        <li>
        <button className='btn #64b5f6 red '
        onClick={()=>{
          localStorage.clear()
          dispatch({type: "CLEAR"})
        //  history.push('/signin')
        }}>Log Out</button>
        </li>
      ]
    }else{
      return [
        <li><Link to="/signin">Signin</Link></li>,
        <li><Link to="/signup">Signup</Link></li>
      ]
    }
  }
  return (
    <nav>
    <div className="nav-wrapper white" >
      <Link to={state?'/':'/signin'} className="brand-logo left">Follow Me</Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
       {renderList()}
      </ul>
    </div>
  </nav>
    
  );
}

export default Navbar;
