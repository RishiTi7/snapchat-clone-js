import React, { useDebugValue, useEffect } from 'react'
import './chats.css'
import SearchIcon from "@material-ui/icons/search"
import {Avatar} from "@material-ui/core";
import {ChatBubbleIcon} from "@material-ui/icons/ChatBubble"
import { auth, db } from './firebase';
import {useState} from "react"
import Chat from './Chat';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './features/appSlice';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useHistory } from 'react-router-dom';
import { resetCameraImage } from './features/cameraSlice';
 

function Chats() {

    const [posts, setPosts] =useState([]);

    const user = useSelector(selectUser); 
    const dispatch = useDispatch();
    const history = useHistory();
    
    
    useEffect(()=>{
        db.collection('posts').orderBy('timestamp',"desc").onSnapShot((SnapShot)=>setPosts(SnapShot.doc.map((doc)=>({
            id:doc.id, data:doc.data(),
        }))))
    })

    const takeSnap =()=>{
        dispatch(resetCameraImage());
        history.push("/")

    }


  return <div className='chats'>
    <div className='chats__header'/>
    <Avatar src = {user.profilePic} onClick={()=>auth.signOut()}className='chats__avatar' />      
    <div className='chats__search' >
    <SearchIcon />
    <input placeholder="friends" type="text"/>
    </div>
    <ChatBubbleIcon className='chats__chatIcon' />
    <div className='chat__posts'>
        {posts.map(({id, data : { profilePic, username, timestamp, imageUrl , read }})=>(
            <Chat key={id}
            id ={id}
            username={username}
            timestamp={timestamp}
            imageUrl={imageUrl}
            read = {read}
            profilePic={profilePic}
            />
        ))}

    </div>
    <RadioButtonUncheckedIcon  
    className='chats__takepicIcon'
    onClick={takeSnap}
    fontSize='large'/>
    </div>
    
   
  
}

export default Chats