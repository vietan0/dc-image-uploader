import { useEffect, useState } from 'react';
import { func, string } from 'prop-types';
import ThemeSwitcher from './ThemeSwitcher';

export default function Home({
  setUploading,
  setFinished,
  preUploadFileSrc,
  setPreUploadFileSrc,
  setImageId,
}) {
  const [preUploadFileName, setPreUploadFileName] = useState('');
  const [preUploadFileObject, setPreUploadFileObject] = useState({});
  const [darkMode, setDarkMode] = useState(false);
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
    // sync OS's theme with state and UI
    const html = document.documentElement;

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // set state on first load
      html.classList.add('dark');
      setDarkMode(true);
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
      // listen for changes after first load
      if (event.matches) {
        html.classList.add('dark');
        setDarkMode(true);
      } else {
        html.classList.remove('dark');
        setDarkMode(false);
      }
    });
  }, []);

  useEffect(() => {
    // change theme when state changes
    const html = document.documentElement;
    if (darkMode) html.classList.add('dark');
    else html.classList.remove('dark');
  }, [darkMode]);

  useEffect(() => {
    // set class of drop-zone <input> element for CSS
    if (isDragging) setDropZoneClassName((prev) => `${prev} isDragging`);
    else setDropZoneClassName((prev) => prev.replace(' isDragging', ''));

    if (preUploadFileName) setDropZoneClassName((prev) => `${prev} selected`);
    else setDropZoneClassName((prev) => prev.replace(' selected', ''));
  }, [isDragging, preUploadFileName]);

  return (
    <div className="Home">
      <div className="header">
        <p className="title">Upload Your Image</p>
        <ThemeSwitcher
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      </div>
      <p className="subtext">
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
        id="uploadFile"
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
    </div>
  );
}

Home.propTypes = {
  setUploading: func.isRequired,
  setFinished: func.isRequired,
  preUploadFileSrc: string.isRequired,
  setPreUploadFileSrc: func.isRequired,
  setImageId: func.isRequired,
};
