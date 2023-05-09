import { useEffect, useState } from 'react';
import Home from './components/Home';
import Uploading from './components/Uploading';
import Finished from './components/Finished';
import Banner from './components/Banner';

function App() {
  const [uploading, setUploading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [onHome, setOnHome] = useState(true);

  const [preUploadFileSrc, setPreUploadFileSrc] = useState('');
  const [imageId, setImageId] = useState('');

  const [online, setOnline] = useState(true);

  useEffect(() => {
    if (uploading === false && finished === false) setOnHome(true);
    else setOnHome(false);
  }, [uploading, finished]);

  useEffect(() => {
    if (!navigator.onLine) setOnline(false);

    window.addEventListener('online', () => {
      setOnline(true);
    });

    window.addEventListener('offline', () => {
      setOnline(false);
    });
  }, [online]);

  return (
    <main className="App">
      <h1 className="sr-only">Image Uploader</h1>
      {online || <Banner />}
      <div className="container">
        {onHome && (
          <Home
            setUploading={setUploading}
            setFinished={setFinished}
            preUploadFileSrc={preUploadFileSrc}
            setPreUploadFileSrc={setPreUploadFileSrc}
            setImageId={setImageId}
          />
        )}
        {uploading && <Uploading />}
        {finished && (
          <Finished
            preUploadFileSrc={preUploadFileSrc}
            imageId={imageId}
          />
        )}
      </div>
    </main>
  );
}

export default App;
