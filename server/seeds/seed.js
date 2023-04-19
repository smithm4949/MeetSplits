const db = require('../config/connection');
// import models to seed them
// const {} = require('../models');

db.once('open', async () => {
  // clear/delete all models
  // then insert many from seed file

  console.log('Database seeded!');
  process.exit(0);
});
