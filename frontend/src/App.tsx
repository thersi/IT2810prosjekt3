import React from 'react';
import { isPropertySignature } from 'typescript';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import MovieDialog from './Components/MovieCard';

function App() {
  return (
    <div>
      <MovieDialog 
      title={'Star Wars: Episode IV - A New Hope'} 
      description={"Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader."}
      imgPath={'https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg'}
      genres={['sience-fiction']}
      year={'1977'}
      />
    </div>
  );
}

export default App;
