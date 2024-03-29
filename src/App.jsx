import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Header from './Components/header/Header'
import Home from './pages/Home'
import MovieList from './Components/MovieList/MovieList'
import Movie from './pages/MovieDetail/Movie'
import Search from './pages/Search/Search'

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="movie/:id" element={<Movie />}/>
          <Route path="movies/:type" element={<MovieList/> }/>
          <Route path="search" element={<Search />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
