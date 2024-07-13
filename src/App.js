import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(response => {
        return response.data.results.map(p => axios.get(p.url));
      })
      .then(pokemonPromises => Promise.all(pokemonPromises))
      .then(pokemonData => {
        setPokemon(pokemonData.map(p => p.data));
      })
      .catch(error => console.log(error));
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredPokemon = pokemon.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="App">
      <h1>Pokemon List</h1>
      <input
        type="text"
        placeholder="Search Pokémon"
        value={search}
        onChange={handleSearchChange}
      />
      <div className="pokemon-list">
        {filteredPokemon.map(p => (
          <div key={p.id} className="pokemon-card">
            <img src={p.sprites.front_default} alt={p.name} />
            <h2>{p.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
