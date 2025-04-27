// src/components/SearchFilters.tsx
import React from 'react';
import styled from 'styled-components';

interface SearchFiltersProps {
  breedFilter: string;
  setBreedFilter: React.Dispatch<React.SetStateAction<string>>;
  sortOrder: string;
  setSortOrder: React.Dispatch<React.SetStateAction<string>>;
}

// Container for the filters
const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 20px 0;
  width: 100%;
  max-width: 500px;
  
`;

// Input field styling
const FilterInput = styled.input`
  padding: 12px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  font-size: 16px;
  transition: all 0.3s ease;
  background-color: #f9f9f9;

  &:focus {
    border-color: rgb(250, 171, 13);
    outline: none;
  }
`;

// Button for sorting
const SortButton = styled.button`
  background-color: rgb(250, 171, 13);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #rgb(250, 171, 13);
  }

  &:focus {
    outline: none;
  }
`;

const SearchFilters = ({ breedFilter, setBreedFilter, sortOrder, setSortOrder }: SearchFiltersProps) => {
  return (
    <FiltersContainer>
      <FilterInput
        type="text"
        placeholder="Filter by breed"
        value={breedFilter}
        onChange={(e) => setBreedFilter(e.target.value)}
      />
      <SortButton onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
        Sort: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
      </SortButton>
    </FiltersContainer>
  );
};

export default SearchFilters;
