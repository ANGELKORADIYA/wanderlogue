import React, { useState } from "react";
import { post } from "../Rest";

import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import  '../../node_modules/react-toastify/dist/ReactToastify.css'
function SignUpForm(props) {
  const navigate = useNavigate();

  const [state, setState] = useState({
    email: "",
    password: "",
    confirmpassword: "",
    name: "",
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
    const button = evt.target.querySelector("button");
    button.style.cursor = "inherit"; // Ensure button inherits the cursor style

    const { name, email, password, confirmpassword } = state;
    try {
      const response = await post("signup", {
        name,
        email,
        password,
        confirmpassword,
      });

      
      if (response.okk) {
        toast.success('🦄 Sign Up Sucessfully !!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        navigate("/login");
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
      }

      // setState({ name: "", email: "", password: "", confirmpassword: "" });
    } catch (error) {
      console.error("Sign up failed:", error);
    } finally {
      document.body.style.cursor = "default"; // Reset cursor to default after processing
      button.style.cursor = ""; // Reset button cursor style
    }
  };

  return (
    <>
      <div className="form-container sign-up-container">
      
        <form onSubmit={handleOnSubmit}>
          <h1>Create Account</h1>
          <input
            type="user"
            name="name"
            value={state.name}
            onChange={handleChange}
            placeholder="Enter USER_NAME"
            required={true}
          />
          <input
            type="email"
            name="email"
            value={state.email}
            onChange={handleChange}
            placeholder="Enter EMAIL"
            required={true}
          />
          <input
            type="password"
            name="password"
            value={state.password}
            onChange={handleChange}
            placeholder="Password"
            required={true}
          />
          <input
            type="password"
            name="confirmpassword"
            value={state.confirmpassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required={true}
          />
          <button id="signupform">Sign Up</button>
        </form>
      </div>
    </>
  );
}

export default SignUpForm;
