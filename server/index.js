const express = require('express');
const apiRoutes = require('./apiRoutes.js')

const app = express();

app.use(express.urlencoded({ extended: false }), express.json());
app.use('/api', apiRoutes)

// 404 page
// if path not specified, attach middleware to every paths
app.use('', (req, res) => {
  res.status(404).json({
    msg: 'Page not found, handled by this message.',
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000!');
});
