import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  header {
    display: flex;
    justify-content: space-between;

    p {
      font-size: 1.75rem;
      font-weight: 700;
      letter-spacing: -0.5px;
    }
  }

  > button {
    background-color: transparent;
    width: fit-content;
    padding: 0 0.5rem;
    display: flex;
    gap: 0.5rem;
    font-size: 0.85rem;

    &:hover {
      background-color: ${({ theme }) => theme.btnSecHover};
    }

    svg {
      width: 16px;
      fill: currentColor;
    }
  }

  img {
    object-fit: contain;
    max-height: 320px;
  }
  
  .link {
    outline: 3px solid ${({ theme }) => theme.codeBg};
    background-color: ${({ theme }) => theme.btnSecBg};
    border-radius: 8px;
    display: flex;
    justify-content: space-between;

    a {
      margin: 0 16px;
      padding: 16px 0;
      white-space: nowrap;
      overflow: scroll;
      text-overflow: ellipsis;
    }

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      padding: 1rem;

      .framer {
        width: 24px;
        height: 24px;

        .empty {
          height: 24px;
        }
      }
    }
  }
`;
