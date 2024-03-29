import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'


function Header() {
  return (
    <div className='header'>
        <div className="headerLeft">
            <Link to="/" style={{textDecoration: "none"}}><p className='logo'>Film <br /> Fanatics <br /> Hub</p></Link>
        </div>
        <div className="headerRight">
            <Link to="/" style={{textDecoration: "none"}}><span>Home</span></Link>
            <Link to="/movies/popular" style={{textDecoration: "none"}}><span>Popular</span></Link>
            <Link to="/movies/top_rated" style={{textDecoration: "none"}}><span>Top Rated</span></Link>
            <Link to="/movies/upcoming" style={{textDecoration: "none"}}><span>Upcoming</span></Link>
            <Link to="/search" style={{textDecoration: "none"}}><span><i class="fa-solid fa-magnifying-glass"></i></span></Link>
        </div>
    </div>
  )
}

export default Header