require('dotenv').config();
const mongoose = require('mongoose');
console.log('MONGO_URI=', process.env.MONGO_URI ? 'loaded' : 'missing');
mongoose.connect(process.env.MONGO_URI, { connectTimeoutMS: 10000 })
  .then(() => {
    console.log('connected');
    return mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
