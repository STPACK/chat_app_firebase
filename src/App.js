import React from "react";
import { signInWithGoogle, signOut, AuthState } from "./firebase";

import Chat from "./component/Chat";

import "./App.css";

const App = () => {
  const { userData, loading } = AuthState();

  const content = () => {
    if (loading) {
      return (
        <main className="main__container">
          <div className="spinner__loading">
            <div className="spinner-border text-primary ">
            </div>
          </div>
        </main>
      );
    }
    if (userData) return <Chat user={userData} />;
    return (
      <main className="main__container">
        <section className="signIn__container">
          <button className=" button-login" onClick={signInWithGoogle}>
            Login with Google
          </button>
          <p>PLEASE LOGIN BEFORE AND LET TO ENJOY</p>
        </section>
      </main>
    );
  };

  return (
    <div className="app__container">
      <header>
        <nav className="app__nav">
          <h1>STP_Chat</h1>
          {userData 
          ? 
          (<div className="nav__content">
            <img src={userData.photoURL} alt="avatar"  className="nav__avatar"/>
            <button onClick={signOut} className="button-signout" >Sign out</button>
            </div>  )
          : null}
        </nav>
      </header>
      {content()}
    </div>
  );
};

export default App;
