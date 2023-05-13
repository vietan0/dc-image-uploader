const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: 'postgres',
  password: process.env.POSTGRES_PASSWORD,
  database: 'image_uploader',
  host: 'localhost',
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const realDB = {
  async getAllImages() {
    const selectAllResult = await pool.query('SELECT * FROM images');
    const allImages = selectAllResult.rows;

    return allImages;
  },

  async getById(id) {
    const selectOneResult = await pool.query('SELECT * FROM images WHERE image_id = $1', [id]);
    const image = selectOneResult.rows[0];

    return image;
  },

  async postImage(file) {
    const {
      fieldname, originalname, encoding, mimetype, destination, filename, path, size,
    } = file;

    const insertResult = await pool.query(
      'INSERT INTO images VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [
        crypto.randomUUID(),
        fieldname,
        originalname,
        encoding,
        mimetype,
        destination,
        filename,
        path,
        size,
      ],
    );
    const image = insertResult.rows[0];

    return image;
  },

  async deleteAllImages() {
    await pool.query('TRUNCATE images');
  },
};

module.exports = realDB;
