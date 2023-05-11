import { createGlobalStyle } from 'styled-components';

const Reset = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    min-width: 240px;
  }

  img {
    width: 100%;
  }
  
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0;
  }

  h1 {
    line-height: 1;
  }

  a {
    text-decoration: none;
  }

  button,
  input, 
  textarea {
    font: inherit;
  }

  button {
    cursor: pointer;
    border: none;
  }
`;

const Base = createGlobalStyle`
  :root {
    font-family: 'Manrope', 'Inter', 'Helvetica', sans-serif;
    color-scheme: light dark;
  }

  body {
    color: ${({ theme }) => theme.text};
  }
  
  a {
    color: ${({ theme }) => theme.link};
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }

  pre,
  code {
    font-family: 'Roboto Mono', 'IBM Plex Mono', monospace;
    font-size: 0.85rem; 
    border-radius: 4px;
    padding: 2px 4px;
    margin-right: 2px;
    
    background-color: ${({ theme }) => theme.codeBg};
  }

  button {
    border-radius: 8px;
    padding: 0.5rem 1rem;
    background-color: ${({ theme }) => theme.primary};

    &:hover {
      color: $white;
      background-color: ${({ theme }) => theme.btnHover};
    }

    &:disabled {
      color: inherit;
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  .App {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: ${({ theme }) => theme.bg};
  }

  .container {
    margin: 0 auto;
    padding: 2rem;
    border-radius: 8px;
    width: 100%;
    max-width: 500px;
    background-color: ${({ theme }) => theme.containerBg};
    box-shadow: 0 16px 8px 8px ${({ theme }) => theme.bgShadow};
  }
`;

export { Reset, Base };
