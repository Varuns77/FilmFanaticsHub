import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
// import Header from './Components/header/Header's
import Home from './pages/Home'
import MovieList from './Components/MovieList/MovieList'
import Movie from './pages/MovieDetail/Movie'
// import Search from './pages/Search/Search'
import Home2 from "./pages/Home2"
import Login from "./pages/Authentication/Login"
import Register from "./pages/Authentication/Register"
import { useEffect, useState } from "react"
import { auth } from './Components/Firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { ToastContainer } from "react-toastify"
import SearchBar from "./Components/SearchBar/SearchBar"
import { Watchlist } from "./pages/Watchlist/Watchlist"

function App() {

  const[user, setUser] = useState();

  useEffect(() => {
    // auth.onAuthStateChanged((user) => {
    //   console.log(user);
    //   setUser(user);
    // })

    // const unsubscribe = onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     // User is signed in
    //     setUser(user);
    //   } else {
    //     // User is signed out
    //     setUser(null);
    //   }
    // });

    // // Cleanup subscription on unmount
    // return () => unsubscribe();

    onAuthStateChanged(auth, (user) => {
      if(user){
        // Yes, you are logged in
        setUser(user);
      }
      else{
        // User is logged out
        console.log("You are logged out");
        setUser(null);
      }
    })
  }, [])

  return (
    <>
      <Router>
        
        <Routes>
          <Route path="/" element={user ? <Navigate to="/home"/> : <Login />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/home" element={<Home />}/>
          <Route path="movie/:id" element={<Movie />}/>
          <Route path="movies/:type" element={<MovieList/> }/>
          <Route path="/search" element={<SearchBar />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </Router>
        <ToastContainer />
    </>
  )
}

export default App
