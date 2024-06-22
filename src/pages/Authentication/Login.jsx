import React, { useState } from 'react'
import './Login.css'
import {auth} from '../../Components/Firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            await signInWithEmailAndPassword(auth, email, password)
            console.log("User Logged In Successfully");
            navigate("/home");
        }
        catch(error){
            console.log(error.message);
        }
    }

  return (

    <>
   {/* <form onSubmit={handleSubmit}>
    <h3>Login</h3>

    <label>Email</label>
    <input type="email"  className="" placeholder='Enter Email ID' value={email} 
    onChange={(e) => setEmail(e.target.value)} />

    <label>Password</label>
    <input type="password"  className="" placeholder='Enter Password' value={password} 
    onChange={(e) => setPassword(e.target.value)} />

    <button type='submit'>
        Submit
    </button>
   </form> */}
<div className="authform">
   <div class="form-container">
	<p class="title">Login</p>
	<form className="form" onSubmit={handleSubmit}>
		<div className="input-group">
			<label>Username</label>
			<input type="email" value={email} 
            onChange={(e) => setEmail(e.target.value)}/>
		</div>
		<div className="input-group">
			<label>Password</label>
			<input type="password" value={password} 
            onChange={(e) => setPassword(e.target.value)} />
			{/* <div className="forgot">
				<a rel="noopener noreferrer" href="#">Forgot Password ?</a>
			</div> */}
		</div>
        
		<button className="sign">Sign in</button>
	</form>
	
		<div className="line"></div>
		
		<p className="signup">Don't have an account? &nbsp;
		{/* <a href="/register" className="signup-link"> Sign up</a> */}
		<Link to="/register" className="signup-link"> Sign up</Link>
	    </p>
	
	
	
</div>
</div>
   </>
  );
}

export default Login