const { mkdirSync, rmSync } = require('fs');
const express = require('express');
const multer = require('multer');
const path = require('path');

function makeApp({
  getAllImages, getById, postImage, deleteAllImages,
}) {
  const app = express();

  app.use(express.urlencoded({ extended: false }), express.json());

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      mkdirSync('client/src/assets/uploaded-images', { recursive: true });
      cb(null, './client/src/assets/uploaded-images');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  const upload = multer({ storage });

  function errHandler(err) {
    console.error('Error caught!', err);
  }

  app.get('/api', (req, res) => {
    res.json({
      success: true,
      msg: 'Welcome to the server!',
    });
  });

  // 1. Get all images
  app.get('/api/images', async (req, res) => {
    try {
      const allImages = await getAllImages();
      res.json({
        success: true,
        length: allImages.length,
        allImages,
      });
    } catch (err) {
      errHandler(err);
    }
  });

  // 2. Get by ID
  app.get('/api/images/:id', async (req, res) => {
    try {
      const image = await getById(req.params.id);

      res.sendFile(path.resolve(image.path));
    } catch (err) {
      errHandler(err);
    }
  });

  // 2. Create new image
  app.post('/api/images', upload.single('fileFromReact'), async (req, res) => {
    try {
      const newImage = await postImage(req.file);
      res.json({
        success: true,
        newImage,
      });
    } catch (err) {
      errHandler(err);
    }
  });

  // 3. Delete image
  app.delete('/api/images', async (req, res) => {
    try {
      rmSync('client/src/assets/uploaded-images', { recursive: true });
      await deleteAllImages();

      res.json({ success: true });
    } catch (err) {
      errHandler(err);
    }
  });

  // 404 page
  // if path not specified, attach middleware to every paths
  app.use('', (req, res) => {
    res.status(404).json({
      success: false,
      status: 404,
      msg: 'Page not found, handled by this message.',
    });
  });

  return app;
}

module.exports = makeApp;
