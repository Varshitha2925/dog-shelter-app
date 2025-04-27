import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LoginContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 98vh;
  background-color:rgb(48,13,56);
  padding: 20px;
  width: 98vw;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: rgb(250, 171, 13);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  width: 320px;
  max-width: 100%;
  text-align: center;
  input {
    background-color: white;}
`;

const Input = styled.input`
  padding: 12px;
  margin: 12px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  transition: border 0.3s;

  &:focus {
    border-color: #3F7DF7;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  background-color:rgb(48,13,56);
  color: white;
  border: none;
  padding: 14px;
  border-radius: 5px;
  transition: all 0.3s ease;
  font-size: 16px;
  margin-top: 10px;

  &:hover {
    background-color:rgb(48,13,56);
  }
`;

const LoginPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://frontend-take-home-service.fetch.com/auth/login',
        { name, email },
        { withCredentials: true }
      );

      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify({ name, email }));
        navigate('/search');
      }
    } catch (error) {
      console.error('Authentication failed', error);
    }
  };

  return (
    <LoginContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <h1>Welcome to Fetch!</h1>
      <LoginForm onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <SubmitButton type="submit">Login</SubmitButton>
      </LoginForm>
    </LoginContainer>
  );
};

export default LoginPage;
