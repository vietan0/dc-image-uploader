const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }), express.json());

app.get('/', (req, res) => {
  res.json({
    msg: 'Welcome to the server!',
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000!');
});
