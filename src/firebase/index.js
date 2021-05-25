import { useEffect, useState } from "react";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDkxLkr2t0_fCB8iyVa6QmvfCAC820Xltk",
  authDomain: "chat-app-bfe6a.firebaseapp.com",
  projectId: "chat-app-bfe6a",
  storageBucket: "chat-app-bfe6a.appspot.com",
  messagingSenderId: "692884970314",
  appId: "1:692884970314:web:ec5f04f76a5eadc5ebffb3",
  measurementId: "G-6WQ0W3F76T",
};

firebase.initializeApp(firebaseConfig);

export const fireStore = firebase.firestore();



export const signInWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().useDeviceLanguage();
  try {
    await firebase.auth().signInWithPopup(provider);
  } catch (e) {
    console.log(e.massage);
  }
};

export const signOut = async () => {
  try {
    await firebase.auth().signOut();
  } catch (e) {
    console.log(e.massage);
  }
};

export const AuthState = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserData(user);
      } else {
        setUserData(false);
      }
      if (loading) {
        setLoading(false);
      }
    });
  }, [loading]);
  return { userData, loading };
};


