const makeApp = require('./makeApp');
const realDB = require('./postgres');

const realApp = makeApp(realDB);

realApp.listen(3000, () => {
  console.log('Server listening on port 3000!');
});
