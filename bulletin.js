var hydraExpress = require('hydra-express');
var hydra = hydraExpress.getHydra();
var config = require('./config.json');



	

 hydraExpress.init(config, () => {
	 hydraExpress.registerRoutes({
		'/v1':require('./app-routes.js')
	 })
 }).then((serviceInfo) => {
		console.log('serviceInfo', serviceInfo);
	  })
	  .catch(err => console.log('err', err));
 