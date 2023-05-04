import { useState } from 'react';

function App() {
  const [allImages, setAllImages] = useState([]);
  const [fetchCount, setFetchCount] = useState(0);
  const [selectedFile, setSelectedFile] = useState({});
  const [uploadedImg, setUploadedImg] = useState();

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
    setUploadedImg(destination.replace('client/', '') + '/' + filename);
  }

  return (
    <main className="App">
      <h1>Image Uploader</h1>
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
        {uploadedImg && (
          <img
            src={uploadedImg}
            alt="uploaded image"
          />
        )}
      </div>
    </main>
  );
}

export default App;
