import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { auth, db } from '../../Components/Firebase/firebase';
import './Header.css'
import {doc, getDoc} from "firebase/firestore"
import Dropdown from '../ProfileDropdown/Dropdown';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
    
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
    <div className='header'>
    <div className="headerLeft">
        <Link to="/home" style={{ textDecoration: "none" }}>
          <p className='logo'>Film <br /> Fanatics <br /> Hub</p>
        </Link>
    </div>

      
      <div className={`headerRight ${isOpen ? 'open' : ''}`}>
        <Link to="/home" style={{ textDecoration: "none" }}><span>Home</span></Link>
        <Link to="/movies/popular" style={{ textDecoration: "none" }}><span>Popular</span></Link>
        <Link to="/movies/top_rated" style={{ textDecoration: "none" }}><span>Top Rated</span></Link>
        <Link to="/movies/upcoming" style={{ textDecoration: "none" }}><span>Upcoming</span></Link>
        <Link to="/search" style={{ textDecoration: "none" }}><span><i className="fa-solid fa-magnifying-glass"></i></span></Link>
        <Dropdown />
        {/* <h4>{userDetails ? userDetails.firstName: "Not"}</h4>
        <button onClick={handleLogout}>Logout</button> */}
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <i className={isOpen ? "fa fa-times" : "fa fa-bars"} ></i>
      </div>  
    </div>
    
    </>
  );

}

export default Header