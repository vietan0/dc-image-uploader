import styled from 'styled-components';

export default styled.label.attrs({
  htmlFor: 'themeSwitcher',
})`
  cursor: pointer;
  display: flex;
  border-radius: 4px;
  position: relative;
  justify-content: center;
  align-items: center;

  aspect-ratio: 1;

  input[type=checkbox] {
    height: 0;
    width: 0;
    opacity: 0;
    position: absolute;
  }

  &:hover {
    background-color: ${({ theme }) => theme.bg};
  }

  &:focus,
  &:focus-visible {
    outline: 2px solid hotpink;
  }

  .iconContainer {
    height: 24px;
    overflow: hidden;
  }
  
  svg {
    fill: currentColor;
    display: block;
  }
`;
