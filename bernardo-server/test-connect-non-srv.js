const mongoose = require('mongoose');
const uri = process.argv[2];
console.log('using URI', uri.slice(0,40)+ '...');
mongoose.connect(uri, { connectTimeoutMS: 10000 })
  .then(() => {
    console.log('connected');
    return mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
