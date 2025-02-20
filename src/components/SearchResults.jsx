import React from 'react'
import { Button, Flex, Image, Text } from '@chakra-ui/react';

export const SearchResults = ({ searchResults }) => {
  return searchResults?.data?.map((product, index) => {
    const thumbnailUrl = product.images.find(image => image.perspective === "front").sizes[1].url;
    const price = product?.items?.[0]?.price?.regular;
    const aisle = product?.aisleLocations?.[0]?.description;
    const shelf = product?.aisleLocations?.[0]?.shelfNumber;
    const side = product?.aisleLocations?.[0]?.side;
    const outOfStock = product?.items?.[0]?.inventory?.stockLevel === "TEMPORARILY_OUT_OF_STOCK";

    return (
      <Button key={index} display="flex" alignItems="center" margin="1rem" backgroundColor="white" textAlign="left">
        <Image src={thumbnailUrl} alt={product.description} height="50px" width="50px" />
        <Flex flexDirection="column">
          <Text color="black">{product.description} - {price ? price : "$-.--"}</Text>
          <Text color="black">
            {
              outOfStock || product?.aisleLocations?.length === 0 ? "Out of Stock" : `Found in ${aisle}, ${side} Side, Shelf ${shelf}`
            }
          </Text>
        </Flex>
      </Button>
    )
  })
}
