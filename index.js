const express = require('express');
const pool = require('./postgres');

const app = express();

app.use(express.urlencoded({ extended: false }), express.json());

app.get('/', (req, res) => {
  res.json({
    msg: 'Welcome to the server!',
  });
});

// Routes

// 1. Get all images
app.get('/images', async (req, res) => {
  try {
    const allImages = await pool.query('SELECT * FROM images');
    const { rows } = allImages;
    res.json({
      success: true,
      length: rows.length,
      rows,
    });
  } catch (err) {
    console.log('error alert!');
    console.error(err);
  }
});

// 2. Create new image
app.post('/images', async (req, res) => {
  try {
    const { url } = req.body;
    const insertNewImage = await pool.query('INSERT INTO images(url) VALUES($1) RETURNING *', [
      url,
    ]);

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

// if path not specified, attach middleware to every paths
app.use('', (req, res) => {
  res.status(404).json({
    msg: 'Page not found, handled by this message.',
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000!');
});
