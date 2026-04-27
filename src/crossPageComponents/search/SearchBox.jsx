import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

const SearchBox = ({ value, onChange, placeholder = "Search projects..." }) => {
  return (
    <InputGroup className="mb-4" style={{ maxWidth: '400px' }}>
      <InputGroup.Text id="search-icon">
        <i className="bi bi-search"></i>
      </InputGroup.Text>
      <Form.Control
        placeholder={placeholder}
        aria-label="Search"
        aria-describedby="search-icon"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button 
          className="btn btn-outline-secondary" 
          type="button" 
          onClick={() => onChange('')}
        >
          <i className="bi bi-x"></i>
        </button>
      )}
    </InputGroup>
  );
};

export default SearchBox;