import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      if (!searchTerm || searchTerm.length <= 2) {
        setSearchResults([]);
        return;
      };

      try {
        const response = await axios.get("http://localhost:8000/products", {
          params: {
            ...(searchTerm.length > 2 && {
              "filter.term": searchTerm
            }),
          }
        })

        setSearchResults(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } 
    }
    getProducts(searchTerm);

  }, [searchTerm]);

  console.log('the products', searchResults);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  return (
      <div className="App">
        <input
          type="text"
          placeholder="Search for products here..."
          value={searchTerm}
          onChange={handleSearch}
        >

        </input>
        {
          searchResults.map((product) => {
            return (
              <div>
                <p>{product.description} - {product.productId}</p>
              </div>
            )
          })
        }
      </div>
  );
}

export default App;
