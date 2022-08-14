import { Button } from '@material-ui/core';
import React from 'react'
import { useDispatch } from 'react-redux'
import "./Login.css"
import {auth, provider} from "./firebase";
import { login } from './features/appSlice';

function Login() {
    const dispatch =useDispatch();

    const signIn =()=>{
        auth.signInWithPopup(provider).then(result =>{
            dispatch(login({
                username: result.user.displayName,
                profilePic: result.user.photoURL,
                id: result.user.uid,           // uid stands for unique id
            })
            );
        })
        .catch((error) => alert(error.message));
    };

  return <div className='login'>
    <div className='login__container'>
      <img src ='https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg' alt=""/>
      <Button variant ='outlined' onClick={signIn}> Sign in</Button>

    </div> 
   </div>
  
}

export default Login