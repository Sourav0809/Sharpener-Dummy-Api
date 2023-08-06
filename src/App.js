import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([])


  //fetch handeler function to fetched some data

  const fetchMovieHandeler = async () => {
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
      setMovies(transMovies)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandeler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
