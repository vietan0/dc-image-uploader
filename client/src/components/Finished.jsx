import { string } from 'prop-types';
import { useState } from 'react';
import StyledFinished from '../styles/StyledFinished';

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

export default function Finished({ preUploadFileSrc, imageId }) {
  const [fullUrl] = useState(`${window.location.origin}/api/images/${imageId}`);
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
  }

  return (
    <StyledFinished>
      <p className="title">Upload Successful!</p>
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
          {copied ? <Check /> : <Copy />}
        </button>
      </div>
    </StyledFinished>
  );
}

Finished.propTypes = {
  preUploadFileSrc: string.isRequired,
  imageId: string.isRequired,
};
