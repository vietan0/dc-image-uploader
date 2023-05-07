/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';

function App() {
  const [previewFileName, setPreviewFileName] = useState('');
  const [selectedFile, setSelectedFile] = useState({});
  const [uploadedImg, setUploadedImg] = useState();
  const [darkMode, setDarkMode] = useState(false);
  const handleFileChange = (e) => {
    console.log(e.target.files);
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
      setPreviewFileName(e.target.files[0].name);
    }
  };

  async function uploadFile(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('fileFromReact', selectedFile);

    const res = await fetch('/api/images', {
      method: 'POST',
      body: formData,
    });

    const postRes = await res.json();
    const { destination, filename } = postRes.newImage;
    setUploadedImg(`${destination.replace('client/', '')}/${filename}`);
  }

  useEffect(() => {
    const root = document.documentElement;

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // set state on first load
      root.classList.add('dark');
      setDarkMode(true);
      console.log('darkMode :>> ', darkMode);
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
      console.log('darkMode :>> ', darkMode);
    });
  }, []);

  return (
    <main className="App">
      <h1 className="sr-only">Image Uploader</h1>
      <div className="container">
        <p className="title">Upload Your Image</p>
        <p className="subtext">File should be .jpg, .png,…</p>
        <form
          method="POST"
          encType="multipart/form-data"
          onSubmit={uploadFile}
          id="uploadFile"
        >
          <input
            type="file"
            name="fileFromReact"
            id="dragAndDrop"
            onChange={handleFileChange}
          />
          <label htmlFor="dragAndDrop">{previewFileName || 'Drag or drop your image here'}</label>
          <p>or</p>
          <input
            type="file"
            name="fileFromReact"
            id="uploadButton"
            onChange={handleFileChange}
          />
          <div className="last-row">
            <label htmlFor="uploadButton">Choose a file</label>
            <button type="submit">Upload </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default App;
