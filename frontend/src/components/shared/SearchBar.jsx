import React from 'react'
import { FormGroup } from 'react-bootstrap'

const SearchBar = ({onChange}) => {
  return (
    <FormGroup style={{'marginBottom': "20px"}}>
        <input type="text" className="form-control" placeholder="Rechercher" onChange={onChange}  />
    </FormGroup>
  )
}

export default SearchBar