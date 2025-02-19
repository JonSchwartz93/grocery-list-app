import React from 'react'
import { Flex, Image } from '@chakra-ui/react';

export const SearchResults = ({ searchResults }) => {
    return searchResults.map((product, index) => {
      const thumbnailUrl = product.images.find(image => image.perspective === "front").sizes[1].url;

      return (
        <Flex key={index} alignItems="center">
          <Image src={thumbnailUrl} alt={product.description} height="50px" width="50px" />
          <p>{product.description}</p>
        </Flex>
      )
    })
}

// export default SearchResults
