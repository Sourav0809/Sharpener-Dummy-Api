
import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([])
  const [loader, setLoader] = useState(false)



  //fetch handeler function to fetched some data

  const fetchMovieHandeler = async () => {
    setLoader(true)
    try {
      const fetchedData = await fetch('https://swapi.dev/api/films/').then((Response) => {
        return Response.json()

      })
      const transMovies = fetchedData.results.map((data) => {
        return {
          id: data.episode_id,
          title: data.title,
          releaseDate: data.opening_crawl,
          openingText: data.release_date,

        }
      })
      setLoader(false)
      setMovies(transMovies)

    } catch (error) {
      console.log(error)
    }
  }

  const loaderScreen = <div><img src='https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif' alt='gif img' height={100} width={100} /></div>

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandeler}>Fetch Movies</button>
      </section>
      <section>
        {loader ? loaderScreen : <MoviesList movies={movies} />}
      </section>
    </React.Fragment>
  );
}

export default App;
