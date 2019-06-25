import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Display from './components/Display';
import axios from 'axios';

function App() {
  const [filter, setFilter] = useState('');
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    if (filter.length === 0) { 
      setResults([]);
    } else {
      axios
        .get(`https://restcountries.eu/rest/v2/name/${filter}`)
        .then(response => {
          setResults(response.data)
        })
        .catch(() => 
        setResults([]));

    }
  }, [filter]);
  
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }
  return (
  <div>
    <Filter 
      filter={filter}
      handleFilterChange={handleFilterChange}
    />
    <Display 
      results={results}
      setFilter={setFilter}
    />
  </div>
  );
}

export default App;
