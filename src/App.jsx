// src/App.jsx
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,

} from "react-router-dom";

import  '../node_modules/react-toastify/dist/ReactToastify.css'
import "./app.css";
  
import { post } from "./Rest";
import Navbar from "./navbar/Navbar";
import Lander from "./login/Lander";
import Sidebar from "./gencomp/Sidebar";
import AboutUs from "./gencomp/AboutUs";
import CreatePost from "./postcomp/CreatePost";
import ContantUs from "./gencomp/ContactUs";
import PostList from "./postcomp/PostList";
import RandomPosts from "./postcomp/RandomPosts";
import Footer from "./gencomp/Footer";

const App = () => {
  const [type, setType] = useState("signIn"); // Lander

  const [isSidebarActive, setIsSidebarActive] = useState(false); // Sidebar

  const [cookie, setCookie] = useState(document.cookie);
  const [isAuthenticated, setIsAuthenticated] = useState(!!cookie);

  useEffect(() => {
    (async () =>
      (await post("email")) == false
        ? setIsAuthenticated(false)
        : setIsAuthenticated(!!cookie))();
  }, [cookie]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <>
                <Navbar />
                <Sidebar
                  setIsSidebarActive={setIsSidebarActive}
                  isSidebarActive={isSidebarActive}
                />

                <Lander
                  changecookie={setCookie}
                  setType={setType}
                  settype={"signIn"}
                  type={type}
                />

                {/* <Footer /> */}
              </>
            )
          }
        />
        <Route
          path="/signup"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <>
                <Navbar />
                <Sidebar
                  setIsSidebarActive={setIsSidebarActive}
                  isSidebarActive={isSidebarActive}
                />
                <Lander
                  changecookie={setCookie}
                  setType={setType}
                  settype={"signUp"}
                  type={type}
                />
              </>
            )
          }
        />

        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <>
                <Navbar isAuthenticated={isAuthenticated} />
                <Sidebar
                  setIsSidebarActive={setIsSidebarActive}
                  isSidebarActive={isSidebarActive}
                />

                <RandomPosts isSidebarActive={isSidebarActive} />

                <Footer />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/contactus"
          element={
            <>
              
              <Navbar isAuthenticated={isAuthenticated} />
              <Sidebar
                setIsSidebarActive={setIsSidebarActive}
                isSidebarActive={isSidebarActive}
              />

              <ContantUs />
              
              <Footer />
            </>
          }
        />
        <Route
          path="/aboutus"
          element={
            <>
              
              <Navbar isAuthenticated={isAuthenticated} />
              <Sidebar
                setIsSidebarActive={setIsSidebarActive}
                isSidebarActive={isSidebarActive}
              />

              <AboutUs />
              
              <Footer />
            </>
          }
        />
        <Route
          path="/createpost"
          element={
            isAuthenticated ? (
              <>
                
                <Navbar isAuthenticated={isAuthenticated} />
                <Sidebar
                  setIsSidebarActive={setIsSidebarActive}
                  isSidebarActive={isSidebarActive}
                />
               
                <CreatePost />
               
                <Footer />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/yourpost"
          element={
            isAuthenticated ? (
              <>
                
                <Navbar isAuthenticated={isAuthenticated} />
                <Sidebar
                  setIsSidebarActive={setIsSidebarActive}
                  isSidebarActive={isSidebarActive}
                />
                
                <PostList isSidebarActive={isSidebarActive} />

                <Footer />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="*" element={<>Not Found</>} />
      </Routes>
    </Router>
  );
};

export default App;
