var hydraExpress = require('hydra-express');
var hydra = hydraExpress.getHydra();
var config = require('./config.json');
var bulletins = new Array();



	

 hydraExpress.init(config, () => {
	 hydraExpress.registerRoutes({
		'/v1':require('./app-routes.js')
	 })
 }).then((serviceInfo) => {
		console.log('serviceInfo', serviceInfo);
	  })
	  .catch(err => console.log('err', err));
 
 /*//manque à appeler la fonction 
 var nbBull = readline.question("Combien de bulletins ajoutez-vous ?");
genererBulletins(nbBull);*/
