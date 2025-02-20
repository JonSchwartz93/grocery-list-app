import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Flex } from '@chakra-ui/react'
import useDebounce from './hooks/useDebounce';
import './App.css';
import { SearchResults } from './components/SearchResults';
import { SearchInput } from './components/SearchInput';
import { GroceryList } from './components/GroceryList';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState({});
  const debouncedSearchTerm = useDebounce(searchTerm);

  const [currentIndex, setCurrentIndex] = useState(0);
  const totalResults = searchResults?.meta?.pagination?.total;

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
            }
          ),
          "filter.locationId": "01800443",
          "filter.limit": 10,
          "filter.start": currentIndex,
          }
        })

        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } 
    }
    getProducts(debouncedSearchTerm);

  }, [debouncedSearchTerm, currentIndex]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentIndex(0);
  };

  return (
    <Flex margin="1rem" flexDirection={{ base: "column", md: "row" }}>
      <Box width={{ base: "100%", md: "50%" }}>
        <SearchInput searchTerm={searchTerm} onChange={handleChange} />
        <SearchResults searchResults={searchResults} />
        <Flex alignItems="center" justifyContent="space-around">
          <Button onClick={() => setCurrentIndex(currentIndex - 10)} disabled={currentIndex === 0}>Previous</Button>
          <Button onClick={() => setCurrentIndex(currentIndex + 10)} disabled={totalResults - currentIndex < 10}>Next</Button>
        </Flex>
      </Box>
      <Box width={{ base: "100%", md: "50%" }}>
        <GroceryList />
      </Box>
    </Flex>
  );
}

export default App;
