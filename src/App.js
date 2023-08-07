
import React, { useRef, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([])
  const [loader, setLoader] = useState(false)
  const [error, setError] = useState(null)
  const timerRef = useRef()

  // useEffect(() => {
  //   return () => {
  //     clearInterval(timerRef.current)
  //   }
  // }, [error])

  const retryFunction = () => {
    timerRef.current = setTimeout(() => {
      fetchMovieHandeler()
    }, 2000);
  }

  //fetch handeler function to fetched some data
  async function fetchMovieHandeler() {
    setLoader(true)
    try {

      const fetchedData = await fetch('https://swapi.dev/api/film/')
      // if the api calls fails 
      if (!fetchedData.ok) {
        throw new Error("Some Thing went wrong ! Retrying...")
      }

      const data = await fetchedData.json()
      const transMovies = data.results.map((data) => {
        return {
          id: data.episode_id,
          title: data.title,
          releaseDate: data.opening_crawl,
          openingText: data.release_date,

        }
      })
      clearTimeout(timerRef.current)
      setMovies(transMovies)

    } catch (error) {
      console.log(error)
      setError(error.message)
      retryFunction()

    }
    setLoader(false)

  }
  //loader screen 
  const loaderScreen = <div><img src='https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif' alt='gif img' height={100} width={100} /></div>

  return (
    <>
      <section>
        <button onClick={fetchMovieHandeler}>Fetch Movies</button>

      </section>
      <section>

        {loader ? loaderScreen : <MoviesList movies={movies} />}
        {!loader && error && <p>{error}</p>}
        {error && <button onClick={() => { clearTimeout(timerRef.current) }}>Stop</button>}
      </section>
    </>
  );
}

export default App;
