import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [beers, setBeers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get('https://api.sampleapis.com/beers/ale')
      .then((response) => {
        setBeers(response.data);
      })
      .catch((error) => console.error('Error fetching the beers:', error));
  }, []);

  const filteredBeers = beers.filter((beer) =>
    beer.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Beer Catalog</h1>
      <input
        type="text"
        placeholder="Search beers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      <div className="beer-grid">
        {filteredBeers.map((beer) => (
          <div key={beer.id} className="beer-card">
            <img src={beer.image} alt={beer.name} className="beer-image" />
            <h3>{beer.name}</h3>
            <p>{beer.abv ? `ABV: ${beer.abv}` : 'No ABV available'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
