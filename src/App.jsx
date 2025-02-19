import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useDebounce from './hooks/useDebounce';
import './App.css';
import { SearchResults } from './components/SearchResults';
import { SearchInput } from './components/SearchInput';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const debouncedSearchTerm = useDebounce(searchTerm);

  useEffect(() => {
    const getProducts = async () => {
      if (!debouncedSearchTerm || debouncedSearchTerm.length <= 2) {
        setSearchResults([]);
        return;
      };

      try {
        const response = await axios.get("http://localhost:8000/products", {
          params: {
            ...(debouncedSearchTerm.length > 2 && {
              "filter.term": debouncedSearchTerm,
            }),
          }
        })

        setSearchResults(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } 
    }
    getProducts(debouncedSearchTerm);

  }, [debouncedSearchTerm]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
      <>
        <SearchInput searchTerm={searchTerm} onChange={handleChange} />
        <SearchResults searchResults={searchResults} />
      </>
  );
}

export default App;
