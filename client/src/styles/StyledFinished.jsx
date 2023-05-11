import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  .link {
    outline: 3px solid ${({ theme }) => theme.codeBg};
    background-color: ${({ theme }) => theme.btnSecBg};
    border-radius: 8px;
    display: flex;

    a {
      margin: 0 16px;
      padding: 16px 0;
      white-space: nowrap;
      overflow: scroll;
      text-overflow: ellipsis;
    }

    button {
      display: flex;
      align-items: center;
    }
  }
`;
