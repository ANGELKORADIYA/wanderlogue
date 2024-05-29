import React, { useState, useEffect } from 'react';
import { post } from "../Rest";
import { ToastContainer, toast } from "react-toastify";

function SignInForm(props) {
  const [state, setState] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    document.body.style.cursor = "wait"; // Change cursor to wait for the entire body
    const button = evt.target.querySelector('button');
    button.style.cursor = 'inherit'; // Ensure button inherits the cursor style
    button.disabled = true;
    const { email, password } = state;
    try {
      const response = await post("login", { email, password });

      if (response.okk) {
        document.cookie = `token=${response.token};expires=${new Date(
          new Date().getTime() + 1 * 60 * 60 * 10000
        ).toUTCString()};`;
        toast.success("🦄 log in Sucessfully !!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        await props.changecookie(document.cookie);
      } else {
        toast.warn(response.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        setState({ email: "", password: "" });
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setTimeout(() => {
        
        document.body.style.cursor = "default"; // Reset cursor to default after processing
      }, 1500);
      button.style.cursor = ''; // Reset button cursor style
    button.disabled = false;

    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
        <span>or use your account</span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
          required={true}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
          required={true}
        />
        <a href="#">Forgot your password?</a>
        <button id="signinform">Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
