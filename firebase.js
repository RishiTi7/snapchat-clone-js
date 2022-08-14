import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCo7qMDzj28to7T7PMVk6RVKGZRAoh2XnI",
    authDomain: "snapchat-clone-121c5.firebaseapp.com",
    projectId: "snapchat-clone-121c5",
    storageBucket: "snapchat-clone-121c5.appspot.com",
    messagingSenderId: "241920657267",
    appId: "1:241920657267:web:b43770940740f6e322e706"
  };

  const firebaseApp =firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.fireStore();
  const auth = firebase.auth();
  const storage = new firebase.storage();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { db, auth, storage, provider};


  
  