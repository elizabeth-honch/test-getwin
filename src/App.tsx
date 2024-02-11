import React from 'react';
import './App.css';
import PokemonList from './components/PokemonList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PokemonInfo } from './components/PokemonInfo';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="pokemon" element={<PokemonInfo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
