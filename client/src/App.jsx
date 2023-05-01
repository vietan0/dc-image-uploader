import { useState } from 'react';
import viteLogo from '/vite.svg';

function App() {
  const [allImages, setAllImages] = useState([]);
  const [fetchCount, setFetchCount] = useState(0);
  const [selectedFile, setSelectedFile] = useState({});

  // useEffect(() => {
  //   fetch('/api')
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // }, []);

  function getAllImages(e) {
    e.preventDefault();
    fetch('/api/images')
      .then((res) => res.json())
      .then((data) => {
        setFetchCount((prev) => prev + 1);
        setAllImages(data);
      });
  }

  const handleFileChange = (e) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  function uploadFile(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('fileFromReact', selectedFile);

    fetch('/api/images', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => console.log('POST response', data));
  }

  return (
    <main className="App">
      <div>
        <a
          href="https://vitejs.dev"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={viteLogo}
            className="logo"
            alt="Vite logo"
          />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <form
          method="POST"
          encType="multipart/form-data"
          onSubmit={uploadFile}
        >
          <input
            type="file"
            name="fileFromReact"
            onChange={handleFileChange}
          />
          <button type="submit">Upload Image</button>
        </form>
        <button onClick={getAllImages}>Get All Images</button>
        <pre>
          {fetchCount > 0
            ? JSON.stringify(allImages, null, 2)
            : 'Press button to get images from Postgres'}
        </pre>
      </div>
    </main>
  );
}

export default App;
