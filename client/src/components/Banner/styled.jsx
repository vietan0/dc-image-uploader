import styled from 'styled-components';

export default styled.div`
  background-color: ${({ theme }) => theme.dropZoneBg};

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  position: fixed;
  width: 100%;
  padding: 4px 0;
  top: 0;

  font-size: 0.85rem;

  svg {
    width: 20px;
  }
`;
