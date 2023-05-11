import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import Home from './components/Home';
import Uploading from './components/Uploading';
import Finished from './components/Finished';
import Banner from './components/Banner';
import { darkTheme, lightTheme } from './styles/themes';
import { Reset, Base } from './styles/globalStyles';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [online, setOnline] = useState(true);

  const [uploading, setUploading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [onHome, setOnHome] = useState(true);

  const [preUploadFileSrc, setPreUploadFileSrc] = useState('');
  const [imageId, setImageId] = useState('');

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
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Reset />
      <Base />
      <main className="App">
        <h1 className="sr-only">Image Uploader</h1>
        {online || <Banner />}
        <div className="container">
          {onHome && (
            <Home
              darkMode={darkMode}
              setDarkMode={setDarkMode}
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
    </ThemeProvider>
  );
}

export default App;
