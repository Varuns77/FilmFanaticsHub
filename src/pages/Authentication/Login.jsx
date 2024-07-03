import React, { useEffect, useState } from "react";
import "./Login.css";
import { auth } from "../../Components/Firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    Login();
    TestCredentials();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User Logged In Successfully");
      navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  };

  const Login = () => toast.error("Login to continue");
  const TestCredentials = () => toast("Credentials: john@gmail.com and 123456", {duration: 10000,  position: 'bottom-center', icon: '🔐'})

  return (
    <>
      <Toaster />
      <div className="authform">
        <div class="form-container">
          <p class="title">Login</p>
          <form className="form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Username</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="sign">Sign in</button>
          </form>

          <div className="line"></div>

          <p className="signup">
            Don't have an account? &nbsp;
            <Link to="/register" className="signup-link">
              {" "}
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
