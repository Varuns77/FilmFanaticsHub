import React, { useEffect, useState } from 'react'
import './Dropdown.css'
import { auth, db } from '../../Components/Firebase/firebase';
import {doc, getDoc} from "firebase/firestore"
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

function Dropdown() {
    const [isHovered, setIsHovered] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const navigate = useNavigate()


  const fetchUserData = async() => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()){
        setUserDetails(docSnap.data());
        // console.log(docSnap.data);
      }
      else{
        console.log("User not Logged In");
      }
    })
  }

  async function handleLogout() {
    try{
      await auth.signOut();
      navigate("/login");
      console.log("User logged out successfully");
    }
    catch(error){
      console.error("Error logging out: ", error.message);
    }
  }

  useEffect(() => {
    fetchUserData();
  })

  return (
    <div
      className="profile-dropdown"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="profile-name">
        <h3 className="user-name">{userDetails ? userDetails.firstName : ""}</h3>
        <span className="arrow">&#9660;</span>
      </div>
      {isHovered && (
        <div className="dropdown-content">
          <a href="#">Checklist</a>
          {/* <a href="/settings">Settings</a> */}
          <a onClick={handleLogout}>Logout</a>
        </div>
      )}
    </div>

  )
}

export default Dropdown