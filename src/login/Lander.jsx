import "./lander.css";
import React, { useEffect, useState } from "react";
import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function Lander(props) {
  props.setType(props.settype);

  const handleOnClick = (text) => {
    if (text !== props.type) {
      props.setType(text);
      return;
    }
  };

  const containerClass =
    "container " + (props.type === "signUp" ? "right-panel-active" : "");

  return (
    <div className="App">
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition:Bounce
        />
      <div className={containerClass} id="container">
        <SignUpForm changetype={props.setType} />
        <SignInForm changecookie={props.changecookie} />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with </p>
              <Link to="/login" className="ghost" id="signIn">
                Sign In
              </Link>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details on</p>
              <Link to="/signup" className="ghost" id="signUp">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
