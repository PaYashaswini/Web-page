  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js"
  import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js"

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyA3ukRprjhJPgsTiBVAn61Zwaa9Aue8BhU",
    authDomain: "login-signup-35415.firebaseapp.com",
    projectId: "login-signup-35415",
    storageBucket: "login-signup-35415.appspot.com",
    messagingSenderId: "733865837390",
    appId: "1:733865837390:web:d414007db8930a1e43941f"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  const signUp=document.getElementsByName ("signup.html");
  signUp.addEventListener('click',(event)=>{
    event.preventDefault();
    const email=document.getElementsByName ('email').value;
    const password=document.getElementsByName('password').value;
    

  })
