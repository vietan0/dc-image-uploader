import { useEffect, useState } from 'react';
import { bool, func, string } from 'prop-types';
import ThemeSwitcher from './ThemeSwitcher';
import StyledHome from '../styles/StyledHome';

export default function Home({
  darkMode,
  setDarkMode,
  setUploading,
  setFinished,
  preUploadFileSrc,
  setPreUploadFileSrc,
  setImageId,
}) {
  const [preUploadFileName, setPreUploadFileName] = useState('');
  const [preUploadFileObject, setPreUploadFileObject] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const [dropZoneClassName, setDropZoneClassName] = useState('');

  function updateFileStates(file) {
    setPreUploadFileObject(file);
    setPreUploadFileName(file.name);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // fires when readAsDataURL is done
      setPreUploadFileSrc(reader.result);
    };
  }

  function handleFileChange(e) {
    if (e.target.files) {
      updateFileStates(e.target.files[0]);
    }
  }

  async function uploadFile(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('fileFromReact', preUploadFileObject);

    const res = await fetch('/api/images', {
      method: 'POST',
      body: formData,
    });

    const postRes = await res.json();
    setUploading(true);

    setImageId(postRes.newImage.image_id);

    setTimeout(() => {
      setUploading(false);
      setFinished(true);
    }, 1000);
  }

  function dragOverHandler(e) {
    e.preventDefault();
    setIsDragging(true);
  }

  function dragLeaveHandler(e) {
    e.preventDefault();
    setIsDragging(false);
  }

  function dropHandler(e) {
    e.preventDefault();

    setIsDragging(false);
    updateFileStates(e.dataTransfer.files[0]);
  }

  useEffect(() => {
    // set class of drop-zone <input> element for CSS
    if (isDragging) setDropZoneClassName((prev) => `${prev} isDragging`);
    else setDropZoneClassName((prev) => prev.replace(' isDragging', ''));

    if (preUploadFileName) setDropZoneClassName((prev) => `${prev} selected`);
    else setDropZoneClassName((prev) => prev.replace(' selected', ''));
  }, [isDragging, preUploadFileName]);

  return (
    <StyledHome>
      <header>
        <p>Upload Your Image</p>
        <ThemeSwitcher
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      </header>
      <p>
        File should be
        {' '}
        <code>.jpg</code>
        ,
        {' '}
        <code>.png</code>
        ,…
      </p>
      <form
        method="POST"
        encType="multipart/form-data"
        onSubmit={uploadFile}
      >
        <label htmlFor="dragAndDrop">
          <input
            type="file"
            name="fileFromReact"
            id="dragAndDrop"
            className={dropZoneClassName}
            onChange={handleFileChange}
            onDragOver={dragOverHandler}
            onDragLeave={dragLeaveHandler}
            onDrop={dropHandler}
          />
          {preUploadFileSrc && (
            <img
              src={preUploadFileSrc}
              alt="preUploadFileSrc"
            />
          )}
        </label>
        <p className="fileName">{preUploadFileName || 'Drag or drop your image here'}</p>
        <p>or</p>
        <input
          type="file"
          name="fileFromReact"
          id="uploadButton"
          onChange={handleFileChange}
        />
        <div className="last-row">
          <label htmlFor="uploadButton">Choose a file</label>
          <button
            type="submit"
            disabled={!preUploadFileName}
          >
            Upload
          </button>
        </div>
      </form>
    </StyledHome>
  );
}

Home.propTypes = {
  darkMode: bool.isRequired,
  setDarkMode: func.isRequired,
  setUploading: func.isRequired,
  setFinished: func.isRequired,
  preUploadFileSrc: string.isRequired,
  setPreUploadFileSrc: func.isRequired,
  setImageId: func.isRequired,
};
