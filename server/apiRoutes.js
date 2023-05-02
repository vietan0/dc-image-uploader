const express = require('express');
const path = require('path');
const router = express.Router();
const pool = require('./postgres');
const multer = require('multer');
const { nanoid } = require('nanoid');
const shell = require('shelljs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    shell.mkdir('-p', './client/src/assets/uploaded-images');
    cb(null, './client/src/assets/uploaded-images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

router.get('/', (req, res) => {
  res.json({
    success: true,
    msg: 'Welcome to the server!',
  });
});

// 1. Get all images
router.get('/images', async (req, res) => {
  try {
    const allImages = await pool.query('SELECT * FROM images');
    const { rows } = allImages;
    res.json({
      success: true,
      length: rows.length,
      rows,
    });
  } catch (err) {
    console.log('Error caught here!');
    console.error(err);
  }
});

// 2. Get by ID
router.get('/images/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const found = await pool.query('SELECT * FROM images WHERE image_id = $1', [id]);
    const imgPath = found.rows[0].path;

    res.sendFile(path.resolve(imgPath));
  } catch (err) {
    console.log('Error caught here!');
    console.error(err);
  }
});

// 2. Create new image
router.post('/images', upload.single('fileFromReact'), async (req, res) => {
  const { fieldname, originalname, encoding, mimetype, destination, filename, path, size } =
    req.file;
  try {
    const insertNewImage = await pool.query(
      'INSERT INTO images VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [nanoid(), fieldname, originalname, encoding, mimetype, destination, filename, path, size],
    );
    const newRow = insertNewImage.rows[0];

    res.json({
      success: true,
      newRow,
    });
  } catch (err) {
    console.log('Error caught here!');
    console.error(err);
  }
});

// 3. Delete image
router.delete('/images', async (req, res) => {
  // shell.echo("shell echo!")
  // shell.exec('pwd');

  try {
    // delete image files in upload-images, and
    const { stdout } = shell.exec('sh ./server/script.sh');
    // delete rows in table 'images'
    const deleteAllImages = await pool.query('TRUNCATE images');
    res.json({ success: true, stdout, deleteAllImages });
  } catch (err) {
    console.log('Error caught here!');
    console.error(err);
  }
});

module.exports = router;
