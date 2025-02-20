import React from 'react'
import { Input } from '@chakra-ui/react'

export const SearchInput = ({ searchTerm, onChange }) => {
  return (
    <Input
      type="search"
      placeholder="Search for products here..."
      value={searchTerm}
      onChange={onChange}
    />  
  )
}
