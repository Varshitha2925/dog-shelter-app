import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif;
    background-color:rgb(48,13,56);
    
    color: rgb(250, 171, 13);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  h1, h2, h3 {
    color: #333;
    text-align: center;
  }

  button {
    cursor: pointer;
    font-family: 'Arial', sans-serif;
    border-radius: 5px;
    padding: 12px 18px;
    font-weight: bold;
  }
`;
