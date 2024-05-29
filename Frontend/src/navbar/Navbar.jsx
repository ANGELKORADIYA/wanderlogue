// App.js
import { useState } from "react";
import "./header.css";
import { Link } from 'react-router-dom';

function App(props) {
  const handlelogout = (e)=>{
    document.cookie="token=;expires="+(new Date()).toUTCString()
    window.location = window.location.href;
  }
  return (
    <>
      <nav>
        <div id="logo-container">
          <div id="logoname">
            <p>Wanderlogue</p>
          </div>
        </div>

        <div id="menu">
          <ul>
            <li>
              <Link to="/dashboard">Home</Link>

            </li>
            <li>
            <Link to="/createpost">Create Post</Link>

            </li>
            <li>
            <Link to="/yourpost">Your Post</Link>

            </li>
            <li>
            <input  className="searchbar" placeholder="Search..." type="text" name="search" id="search"  />

            </li>
          </ul>
        </div>

        <div id="nav-right">
          <div id="loginButtons">
            {props.isAuthenticated ? (
              <button className="loginbtns" onClick={handlelogout}>Sign Out</button>
            ) : (
              <>  
                <div><Link to="/login"  className="loginbtns" >Login</Link></div>
                <div><Link className="loginbtns" to="/signup">Signup</Link></div>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default App;
