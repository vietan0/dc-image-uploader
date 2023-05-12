import { bool, func, string } from 'prop-types';
import { useState } from 'react';
import { motion } from 'framer-motion';
import StyledFinished from './styled';
import ThemeSwitcher from '../ThemeSwitcher';

function Copy() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        d="M7 4V2H17V4H20.0066C20.5552 4 21 4.44495 21 4.9934V21.0066C21 21.5552 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5551 3 21.0066V4.9934C3 4.44476 3.44495 4 3.9934 4H7ZM7 6H5V20H19V6H17V8H7V6ZM9 4V6H15V4H9Z"
      />
    </svg>
  );
}

function Check() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        d="M10.0007 15.1709L19.1931 5.97852L20.6073 7.39273L10.0007 17.9993L3.63672 11.6354L5.05093 10.2212L10.0007 15.1709Z"
      />
    </svg>
  );
}

export default function Finished({
  darkMode,
  setDarkMode,
  preUploadFileSrc,
  setPreUploadFileSrc,
  setFinished,
  imageId,
}) {
  const [fullUrl] = useState(`${window.location.origin}/api/images/${imageId}`);
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
  }

  function reset() {
    setCopied(false);
    setPreUploadFileSrc('');
    setFinished(false);
  }

  return (
    <StyledFinished>
      <header>
        <p>Upload Successful!</p>
        <ThemeSwitcher
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      </header>
      <button
        type="button"
        onClick={reset}
      >
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z" />
        </svg>
        Upload Another File
      </button>
      <img
        src={preUploadFileSrc}
        alt="preUploadFileSrc"
      />
      <div className="link">
        <a
          href={fullUrl}
          target="_blank"
          rel="noreferrer"
        >
          {fullUrl}
        </a>
        <button
          type="button"
          onClick={copy}
        >
          <motion.div
            className="framer"
            animate={{ y: copied ? -54 : 0 }}
          >
            <Copy />
            <div className="empty" />
            <Check />
          </motion.div>
        </button>
      </div>
    </StyledFinished>
  );
}

Finished.propTypes = {
  darkMode: bool.isRequired,
  setDarkMode: func.isRequired,
  preUploadFileSrc: string.isRequired,
  setPreUploadFileSrc: func.isRequired,
  setFinished: func.isRequired,
  imageId: string.isRequired,
};
