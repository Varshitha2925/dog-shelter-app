// src/pages/MatchPage.tsx
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

// Main container for the page
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: rgb(250, 171, 13);
  padding: 20px;
  width: 100vw;
  
`;

// Styled title
const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
`;

// Styled description
const Description = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 20px;
  text-align: center;
  max-width: 600px;
`;

// Card to display match
const MatchCard = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgb(250, 171, 13);
  width: 80%;
  max-width: 400px;
  text-align: center;
  margin-bottom: 20px;
`;

// Styled button for further action
const ActionButton = styled.button`
  background-color: rgb(250, 171, 13);
  color: white;
  border: none;
  padding: 14px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgb(250, 171, 13);
  }

  &:focus {
    outline: none;
  }
`;

const MatchPage = () => {
  const { state } = useLocation();
  const match = state?.match;

  return (
    <PageContainer>
      <Title>Your Dog Match</Title>
      <Description>
        Congratulations! You've found a match for adoption. Here's your match
        based on your preferences. If you like this match, you can proceed with
        further actions.
      </Description>

      {match ? (
        <MatchCard>
          <h3>Matched Dog ID: {match}</h3>
          {/* You can add more details here, such as the dog's image, breed, age, etc. */}
          <ActionButton onClick={() => alert('Proceeding with adoption!')}>
            Proceed with Adoption
          </ActionButton>
        </MatchCard>
      ) : (
        <p>No match found. Please try again!</p>
      )}
    </PageContainer>
  );
};

export default MatchPage;
