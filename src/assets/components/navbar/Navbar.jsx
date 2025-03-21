import React, { useState } from "react";
import "./Navbar.css";
import { MdOutlineDarkMode } from "react-icons/md";
import { CiSun } from "react-icons/ci";
import { Link } from "react-router-dom";

function Navbar({ isDarkMode, setIsDarkMode }) {
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-theme");
  };

  return (
    <>
      <div className={`contry ${isDarkMode ? "active" : ""}`}>
        <div className="container">
          <div className="logo">
            {" "}
            <Link to={"/"} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
  <h1>Where in the world?</h1>
</Link>
          </div>
          <div className="dark_mood" onClick={toggleDarkMode}>
            {isDarkMode ? (
              <div className="dark">
                <CiSun className="darks" />
                <h2>Light</h2>
              </div>
            ) : (
              <div className="mod">
                <MdOutlineDarkMode className="darks" />
                <h2> Mode</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
