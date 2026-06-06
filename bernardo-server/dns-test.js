const dns = require('dns');
const { Resolver } = dns;
(async () => {
  console.log('system servers', dns.getServers());
  try {
    const res = await dns.promises.resolveSrv('_mongodb._tcp.ztwks0s.mongodb.net');
    console.log('system resolveSrv', res);
  } catch (err) {
    console.error('system resolveSrv error', err.code, err.message);
  }
  try {
    const resolver = new Resolver();
    resolver.setServers(['8.8.8.8']);
    const res2 = await resolver.promises.resolveSrv('_mongodb._tcp.ztwks0s.mongodb.net');
    console.log('8.8.8.8 resolveSrv', res2);
  } catch (err) {
    console.error('8.8.8.8 resolveSrv error', err.code, err.message);
  }
})();
