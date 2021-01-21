import React, { useEffect, createContext, useReducer , useContext} from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Home from "./components/Home";
import Signin from "./components/Signin";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import CreatePost from "./components/CreatePost";
import UserProfile from "./components/UserProfile"
import SubscribedUserPosts from "./components/SubscribedUserPosts"

import {reducer, initialState}  from './reducer/userReducer'
export const  userContext = createContext();

const Routing=()=> {
  const history = useHistory()

  const {state, dispatch}=useContext(userContext)

  useEffect(()=>{
    const user=localStorage.getItem('user')
    //console.log(user)
    if(user){
      dispatch({type: 'USER', payload: user})
     // history.push('/')
    }
    else {
      history.push('/signin')
    }
  }, [state])//i changed this to state
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/signin">
        <Signin />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route path="/createpost">
        <CreatePost />
      </Route>
      <Route path="/profile/:userid">
        <UserProfile/>
      </Route>
      <Route path="/myfollowingpost">
        <SubscribedUserPosts/>
      </Route>
    </Switch>
  );
}

function App() {
  const[state, dispatch] = useReducer(reducer, initialState)
  return (
    <userContext.Provider value={{state, dispatch}}>
    <BrowserRouter>
      <Navbar />
      <Routing />
    </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
/*
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/signin">
        <Signin />
      </Route>
      <Route path='/signup'>
      <SignUp/>
      </Route>
      <Route path='/profile'>
      <Profile/>
      </Route>
      <Route path='/createpost'>
      <CreatePost/>
      </Route>
    </BrowserRouter>
  );
}*/
