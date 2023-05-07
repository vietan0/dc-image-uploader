/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';

function App() {
  const [preUploadFileName, setPreUploadFileName] = useState('');
  const [preUploadFileSrc, setPreUploadFileSrc] = useState();
  const [preUploadFileObject, setPreUploadFileObject] = useState({});
  const [uploadedImgPath, setUploadedImgPath] = useState();
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
    const { destination, filename } = postRes.newImage;
    setUploadedImgPath(`${destination.replace('client/', '')}/${filename}`);
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
    const root = document.documentElement;

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // set state on first load
      root.classList.add('dark');
      setDarkMode(true);
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
      // listen for changes after first load
      if (event.matches) {
        root.classList.add('dark');
        setDarkMode(true);
      } else {
        root.classList.remove('dark');
        setDarkMode(false);
      }
    });
  }, []);

  // useEffect(() => {
  //   const root = document.documentElement;
  //   if (darkMode) root.classList.add('dark');
  //   else root.classList.remove('dark');
  // }, [darkMode]);

  useEffect(() => {
    if (isDragging) {
      setDropZoneClassName((prev) => `${prev} isDragging`);
    } else setDropZoneClassName((prev) => prev.replace(' isDragging', ''));

    if (preUploadFileName) {
      setDropZoneClassName((prev) => `${prev} selected`);
    } else setDropZoneClassName((prev) => prev.replace(' selected', ''));
  }, [isDragging, preUploadFileName]);

  return (
    <main className="App">
      <h1 className="sr-only">Image Uploader</h1>
      <div className="container">
        <div className="header">
          <p className="title">Upload Your Image</p>
          <div className="theme-switcher">
            <p>Dark Mode:</p>
            <input
              type="checkbox"
              id="switch"
              onChange={() => setDarkMode((bool) => !bool)}
              checked={darkMode}
            />
            <label htmlFor="switch">Toggle</label>
          </div>
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
    </main>
  );
}

export default App;
