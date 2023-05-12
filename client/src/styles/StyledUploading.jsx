import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  from { transform: translateX(-120px); } 
  to { transform: translateX(500px); }
`;

export default styled.div`
  .loading-bar {
    width: 100%;
    height: 10px;
    margin-top: 20px;
    border-radius: 100px;
    background-color: ${({ theme }) => theme.loadingBar};
    overflow: hidden;

    .running-bar {
      width: 120px;
      height: 10px;
      border-radius: 100px;
      background-color: ${({ theme }) => theme.primary};
      animation: ${loading} 1s ease-out infinite;
    }
  }
`;
