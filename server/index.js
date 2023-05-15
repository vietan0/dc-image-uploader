const makeApp = require('./makeApp');
const supabase = require('./supabase');

const realApp = makeApp(supabase);

realApp.listen(3000, () => {
  console.log('Server listening on port 3000!');
});
