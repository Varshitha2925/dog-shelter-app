import styled from 'styled-components';
import { motion } from 'framer-motion';

const CardContainer = styled(motion.div)`
  background-color: #FFF;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  width: 250px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 25px rgb(48,13,56);
  }
`;

const DogImage = styled.img`
  width: 100%;
  border-radius: 8px;
`;

const DogCard = ({ dog, toggleFavorite, isFavorite }: any) => {
  return (
    <CardContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <DogImage src={dog.img} alt={dog.name} />
      <h3>{dog.name}</h3>
      <p>{dog.breed}</p>
      <p>Age: {dog.age}</p>
      <button onClick={() => toggleFavorite(dog.id)}>
        {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      </button>
    </CardContainer>
  );
};

export default DogCard;
