import React, { useEffect } from 'react';
import './App.css';
import WebcamCapture from './WebcamCapture';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Preview from './Preview';
import Chats from "./Chats";
import ChatView from './ChatView';
import { useDispatch, useSelector } from 'react-redux';
import Login from './Login';
import { auth } from './firebase';
import { login, logout } from './features/appSlice';


function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(()=>{                                                 //this action is used once we loged in so that we dont ahve to log in again and again
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        dispatch(login({
          username: authUser.displayName,
          profilePic: authUser.photoURL,
          id: authUser.uid,
        }))
      } else{
        dispatch(logout())
      }

    })
  },[])
  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ):(
      <div className="app__body">
        <Switch>
        <Route path ="/Chats/view">
            <ChatView/>
            </Route>
        <Route path ="/Chats">
            <Chats/>
            </Route>
          <Route path ="/preview">
            <Preview/>
            </Route>
            <Route exact path="/">
              <WebcamCapture /> 
            </Route>
        </Switch>
      </div>

        )}
     </Router>
    </div>
  );
}

export default App;
