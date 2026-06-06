require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8']);
const mongoose = require('mongoose');
console.log('dns servers', dns.getServers());
mongoose.connect(process.env.MONGO_URI, { connectTimeoutMS: 10000 })
  .then(() => {
    console.log('connected');
    return mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
