import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { auth, db } from '../../Components/Firebase/firebase';
import { setDoc, doc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';

function Register() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("");

    const notify = () => toast.error("error.message");

    const handleRegister = async (e) => {
        e.preventDefault();
        try{
            await createUserWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;
            console.log(user);
            if(user){
                await setDoc(doc(db, "Users", user.uid), {
                    email: user.email,
                    firstName: fname,
                    lastName: lname,
                })
            }
            console.log("User is registered successfully");
            // toast.success("User is registered successfully", {
            //     position: "top-center",
            // })
            window.location.href="/login";
            // notify();
            
        }
        catch (error) {
            console.log(error.message);
            // toast.success(error.message, {
            //     position: "bottom-center",
            // })
            
            // notify();
            
        }
    }

  return (
    <>
<div className="authform">
   <div class="form-container">
	<p class="title">Sign Up</p>
	<form className="form" onSubmit={handleRegister}>
		<div className="input-group">
			<label>First Name</label>
			<input type="text" placeholder="First Name"
            onChange={(e) => setFname(e.target.value)} required />
		</div>

		<div className="input-group">
			<label>Last Name</label>
			<input type="text" placeholder="Last Name"
            onChange={(e) => setLname(e.target.value)} required />
		</div>

        <div className="input-group">
			<label>Email Address</label>
			<input type="email" placeholder="Email Address" 
            onChange={(e) => setEmail(e.target.value)} required/>
		</div>

		<div className="input-group">
			<label>Password</label>
			<input type="password" placeholder="Password"
            onChange={(e) => setPassword(e.target.value)} required />
		</div>
        
		<button className="sign">Sign Up</button>
	</form>
	
    
		<div className="line"></div>
		{/* <p className="message">Login with social accounts</p> */}
		{/* <div className="line"></div> */}
	
	
	<p className="signup">Already Registered? &nbsp;
		<a href="/login" className="signup-link">Login</a>
	</p>
</div>
</div>
   </>
  )
}

export default Register