/* eslint-disable react-hooks/exhaustive-deps */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import MovieForm from './components/MovieForm';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([])
  const [loader, setLoader] = useState(false)
  const [error, setError] = useState(null)
  const timerRef = useRef()

  function retryFunction() {
    timerRef.current = setTimeout(() => {
      fetchMovieHandeler()
    }, 2000);
  }

  /* -------------------------------------------------------------------------- */
  /*                fetch handeler function to fetched some data                */
  /* -------------------------------------------------------------------------- */

  const fetchMovieHandeler = useCallback(async () => {
    setLoader(true)
    try {

      const fetchedData = await fetch('https://sharpener-dummy-api-default-rtdb.firebaseio.com/movies.json')

      // if the api calls fails 
      if (!fetchedData.ok) {
        throw new Error("Some Thing went wrong ! Retrying...")
      }

      const data = await fetchedData.json()

      const transMovies = []

      for (const key in data) {
        transMovies.push(
          {
            id: key,
            title: data[key].title,
            openingText: data[key].openingText,
            releaseDate: data[key].releaseDate,
          }
        )
      }

      clearTimeout(timerRef.current)
      setMovies(transMovies)

    } catch (error) {
      console.log(error)
      setError(error.message)
      retryFunction()

    }
    setLoader(false)

  }, [])


  useEffect(() => {
    fetchMovieHandeler()
  }, [fetchMovieHandeler])


  /* -------------------------------------------------------------------------- */
  /*                        Function to do a post request                       */
  /* -------------------------------------------------------------------------- */

  const addMovieHandeler = async (movies) => {
    try {
      const postData = await fetch('https://sharpener-dummy-api-default-rtdb.firebaseio.com/movies.json', {
        method: 'POST',
        body: JSON.stringify(movies),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      console.log(postData)

    } catch (error) {
      console.log(error)
    }

    // eslint-disable-next-line no-restricted-globals
    location.reload()
  }


  /* -------------------------------------------------------------------------- */
  /*                 function to delete movies from the firebase                */
  /* -------------------------------------------------------------------------- */

  const deletedMovie = async (movieId) => {
    try {
      // Delete movie from Firebase
      await fetch(`https://sharpener-dummy-api-default-rtdb.firebaseio.com/movies/${movieId}.json`, {
        method: 'DELETE',
      });

      // Update UI state by removing the deleted movie
      setMovies(prevMovies => prevMovies.filter(movie => movie.id !== movieId));
    } catch (error) {
      alert('Error deleting movie:', error);

    }
  };


  //loader screen 
  const loaderScreen = <div><img src='https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif' alt='gif img' height={100} width={100} /></div>

  return (
    <>
      <MovieForm addMovieHandeler={addMovieHandeler} />
      <section>
        <button onClick={fetchMovieHandeler}>Fetch Movies</button>

      </section>
      <section>

        {loader ? loaderScreen : <MoviesList movies={movies} deletedMovie={deletedMovie} />}
        {!loader && error && <p>{error}</p>}
        {movies.length === 0 && <h1>No Movies Found</h1>}
        {error && <button onClick={() => { clearTimeout(timerRef.current) }}>Stop</button>}
      </section>
    </>
  );
}

export default App;



