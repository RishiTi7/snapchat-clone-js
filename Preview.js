import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { resetCameraImage, selectCameraImage } from './features/cameraSlice';
import "./Preview.css";
import CloseIcon from "@material-ui/icons/Close"
import TextFieldsIcon from '@mui/icons-material/TextFields';
import CreateIcon from '@mui/icons-material/Create';
import NoteIcon from '@mui/icons-material/Note';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CropIcon from '@mui/icons-material/Crop';
import TimerIcon from '@mui/icons-material/Timer';
import SendIcon from '@mui/icons-material/Send';
import { v4 as uuid } from 'uuid';
import {db, storage} from "./firebase";
import {firebase} from 'firebase';
import { selectUser } from './features/appSlice';

function Preview() {
  const cameraImage = useSelector(selectCameraImage)
  const history =useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(()=>{
    if (!cameraImage){
      history.replace("/")
    }
  },[cameraImage, history]);

  const closePreview = () =>{
    dispatch(resetCameraImage());
  }

  const sendPost =() =>{
    const id = uuid();
    const uploadTask = storage.ref(`posts/${id}`).putString(cameraImage, "data_url");

    uploadTask.on('state_changed' , null, (error) => {
      console.log(error)
    },()=>{
      storage.ref('posts').child(id).getDownloadURL().then((url) =>{
        db.collection('posts').add({
          imageURl :url,
          username : "rishi",
          read : false,
          profilepic: user.profilePic,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        history.replace("/chats");
      })
    })
  }
  return (
    <div className = "preview">
      <CloseIcon onClick ={closePreview} className="preview__class" />
      <div className ="preview__toolbarRight">
        <TextFieldsIcon />
        <CreateIcon />
        <NoteIcon />
        <MusicNoteIcon />
        <AttachFileIcon />
        <CropIcon />
        <TimerIcon />
      </div>
      <img src = {cameraImage} alt="" />
      <div onClick={sendPost}className='preview__footer' >
        <h2>SEND NOW</h2>
        <SendIcon fontSize ='small' className="preview__sendIcon" />
      </div>
    </div>
  )
}

export default Preview;

//> means direct path (direct)
//uuid pushes the images or data into the database