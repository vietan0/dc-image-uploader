import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  p {
    text-align: center;
  }

  .condition {
    border-radius: 4px;
    padding: 0.5rem;
    width: fit-content;
    align-self: center;

    &.error {
      outline: 4px solid ${({ theme }) => theme.error};
    }
  }

  header {
    display: flex;
    justify-content: space-between;

    p {
      font-size: 1.75rem;
      font-weight: 700;
      letter-spacing: -0.5px;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: center;
    gap: 1rem;

    input {
      cursor: pointer;
      color: transparent; // hide "No file selected"

      &::file-selector-button {
        display: none; // hide "Browse..." button
      }

      &#dragAndDrop {
        width: 100%;
        height: 320px;
        border-radius: 8px;

        background-image: url('/src/assets/image.svg');
        background-position: center;
        background-repeat: no-repeat;
        background-size: 40%;

        outline: 3px dashed ${({ theme }) => theme.primary};
        background-color: ${({ theme }) => theme.dropZoneBg};

        &.isDragging {
          outline: 3px dashed ${({ theme }) => theme.dropZoneDragging};
        }

        &.selected {
          background-image: none;
        }
      }

      &#uploadButton {
        display: none;
      }
    }

    p {
      width: 100%;
    }

    label {
      cursor: pointer;

      &[for='dragAndDrop'] {
        position: relative;

        img {
          height: 320px;
          object-fit: contain;
          position: absolute;
          left: 0;
        }
      }

      &[for='uploadButton'] {
        width: fit-content;
        border-radius: 8px;
        border: none;
        padding: 0.5rem 1rem;

        background-color: ${({ theme }) => theme.btnSecBg};
        outline: 1px solid ${({ theme }) => theme.primary};

        &:hover {
          background-color: ${({ theme }) => theme.btnSecHover};
        }
      }
    }

    .fileName {
      color: ${({ theme }) => theme.textSec};
    }

    .last-row {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
    }
  }

  img[alt='preUploadFileSrc'] {
    height: 320px;
    object-fit: contain;
    left: 0;
  }
`;
