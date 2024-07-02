import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { auth, db } from "../../Components/Firebase/firebase";
import "./Header.css";
import { doc, getDoc } from "firebase/firestore";
import Dropdown from "../ProfileDropdown/Dropdown";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="header">
        <div className="headerLeft">
          <NavLink
            to="/home"
            className={" logo gradient-text "}
          >
            
              Film <br /> Fanatics <br /> Hub
            
          </NavLink>
        </div>

        <div className={`headerRight ${isOpen ? "open" : ""}`}>
          {/* <Link to="/home" style={{ textDecoration: "none" }}><span>Home</span></Link> */}
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? "gradient-background" : "gradient-text"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/movies/popular"
            className={({ isActive }) =>
              isActive ? "gradient-background" : "gradient-text"
            }
          >
            Popular
          </NavLink>
          <NavLink
            to="/movies/top_rated"
            className={({ isActive }) =>
              isActive ? "gradient-background" : "gradient-text"
            }
          >
            Top Rated
          </NavLink>
          <NavLink
            to="/movies/upcoming"
            className={({ isActive }) =>
              isActive ? "gradient-background" : "gradient-text"
            }
          >
            Upcoming
          </NavLink>
          <NavLink
            to="/search"
            className={({ isActive }) =>
              isActive ? "gradient-background" : "gradient-text"
            }
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </NavLink>
          <Dropdown />
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <i className={isOpen ? "fa fa-times" : "fa fa-bars"}></i>
        </div>
      </div>
    </>
  );
}

export default Header;
