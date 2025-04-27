// src/pages/SearchPage.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DogCard from '../components/DogCard';
import SearchFilters from '../components/SearchFilters';
import styled from 'styled-components';
import { motion } from 'framer-motion';


interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width:100vw;
  align-items: center;
  background-color: rgb(236, 195, 113);
  padding: 20px;
  min-height: 100vh;
  
  button {
    background-color: rgb(48,13,56);
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 5px;
    transition: background-color 0.3s;
    font-size: 16px;
    }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
`;

const DogListContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  
  padding: 20px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  padding: 20px;
`;

const PaginationButton = styled.button`
  background-color: rgb(48,13,56);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 5px;
  transition: background-color 0.3s;
  font-size: 16px;

  &:hover {
    background-color:rgb(48,13,56);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const SearchPage = () => {
  const [dogs, setDogs] = useState<Dog[]>([]); // Initialize with an empty array
  const [favorites, setFavorites] = useState<string[]>([]);
  const [breedFilter, setBreedFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0); // Initialize total with a default value of 0
  const navigate = useNavigate();

  useEffect(() => {
    fetchDogs();
  }, [breedFilter, sortOrder, page]);

  const fetchDogs = async () => {
    try {
      const response = await axios.get('https://frontend-take-home-service.fetch.com/dogs/search', {
        params: {
          breeds: breedFilter ? [breedFilter] : [],
          sort: `breed:${sortOrder}`,
          size: 25,
          from: (page - 1) * 25
        },
        withCredentials: true
      });
      setDogs(response.data.results);
      setTotal(response.data.total);
    } catch (error) {
      console.error('Error fetching dogs:', error);
    }
  };

  const toggleFavorite = (dogId: string) => {
    setFavorites((prev) =>
      prev.includes(dogId) ? prev.filter((id) => id !== dogId) : [...prev, dogId]
    );
  };

  const handleMatch = async () => {
    try {
      const response = await axios.post('https://frontend-take-home-service.fetch.com/dogs/match', { body: favorites }, { withCredentials: true });
      navigate('/match', { state: { match: response.data.match } });
    } catch (error) {
      console.error('Error generating match:', error);
    }
  };

  return (
    <PageContainer>
      <Title>Search Dogs</Title>
      <SearchFilters breedFilter={breedFilter} setBreedFilter={setBreedFilter} sortOrder={sortOrder} setSortOrder={setSortOrder} />
      <DogListContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        {dogs.map((dog) => (
          <DogCard key={dog.id} dog={dog} toggleFavorite={toggleFavorite} isFavorite={favorites.includes(dog.id)} />
        ))}
      </DogListContainer>
      <PaginationContainer>
        <PaginationButton disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</PaginationButton>
        <PaginationButton disabled={page * 25 >= total} onClick={() => setPage(page + 1)}>Next</PaginationButton>
      </PaginationContainer>
      <button onClick={handleMatch}>Generate Match</button>
    </PageContainer>
  );
};

export default SearchPage;
