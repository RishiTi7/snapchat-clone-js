import React, { useCallback, image, useState } from 'react';
import Webcam from 'react-webcam';
import { useRef } from 'react';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useDispatch } from 'react-redux';
import { setCameraImage } from './features/cameraSlice';
import {useHistory} from "react-router-dom"
import "./WebcamCapture.css";

const videoConstraints ={
    width:250,
    height:400,
    facingMode:"user",  // front facing camera
}


function WebcamCapture() {
    const webcamRef = useRef(null);    // reference is like a pointer( points at certain stuff) 
    // const[ image, setImage] =useState(null);
    const dispatch = useDispatch();

    const history = useHistory(); 


    const capture = useCallback(() =>{
        const imageSrc = webcamRef.current.getScreenshot();
        dispatch(setCameraImage(imageSrc));
        history.push('/preview')
        // setImage(imageSrc)

    } ,[webcamRef])   /// this callback hook is very powerful because it stores the result of the function and this will happen when theres a change in the dependency like webcamref changes it gets executed ,the function gets executed like the first capture takes time but the second and third gets gets executed instantly  
  return <div className = 'WebcamCapture' >
    <Webcam 
      audio ={false}
      height={videoConstraints.height}
      ref ={webcamRef}
      screenshotFormat="image/jpeg"
      width={videoConstraints.width}
      videoConstraints={videoConstraints}
    
    />
    <RadioButtonUncheckedIcon  className = 'WebcamCapture__button'
    onClick = {capture}
    fontSize = "large"/>
    {/* <img src ={image} alt ="" />            */}
  </div>
  // images are in base-64 encoded are are in jpeg format
}

export default WebcamCapture