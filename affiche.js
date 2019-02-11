var hydraExpress = require('hydra-express');
var hydra = hydraExpress.getHydra();
var config = require('./config.json');

config.hydra.serviceName = 'affiche';

hydraExpress.init(config, () => {})
  .then((serviceInfo) => {
    console.log('serviceInfo', serviceInfo);

    hydra.on('message', (message) => {
      console.log('message reply', message);
    });

    let message = hydra.createUMFMessage({
      to: 'stock:/',
      frm: 'affiche:/',
      bdy: {}
    });

    hydra.sendMessage(message);
  })
  .catch(err => console.log('err', err));