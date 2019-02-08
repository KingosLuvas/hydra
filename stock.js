var hydraExpress = require('hydra-express');
var hydra = hydraExpress.getHydra();
var config = require('./config.json');

config.hydra.serviceName = 'stock';




hydraExpress.init(config, () => {})
  .then((serviceInfo) => {
	  
    console.log('serviceInfo', serviceInfo);

    hydra.on('message', (message) => {
      console.log('message reply', message);

	let response = hydra.createUMFMessage({
      to: 'affiche:/',
      frm: 'stock:/',
      bdy: {}
    });	


    hydra.sendMessage(response);
    });
   
  })
  .catch(err => console.log('err', err));