var hydraExpress = require('hydra-express');
var hydra = hydraExpress.getHydra();
var config = require('./config.json');

config.hydra.serviceName = 'stock';




hydraExpress.init(config, () => {})
  .then((serviceInfo) => {
	  
    console.log('serviceInfo', serviceInfo);
	var bulletins = [];
	
	
    hydra.on('message', (message) => {
			console.log("Nouveau message :");
      console.log('message reply', message);
	  

	  
	if (message.frm=='affiche:/') {
		let response = hydra.createUMFMessage({
		  to: 'affiche:/',
		  frm: 'stock:/',
		  bdy: bulletins
		});	
		hydra.sendMessage(response);
	}
	
	else if(message.frm=='genere:/'){
	  var bulletin = message.bdy.date+" "+message.bdy.ville+" "+message.bdy.meteo+" "+message.bdy.temperature;
	  bulletins.push(bulletin);
	  console.log(bulletins);
	}
	
   });
  })
  .catch(err => console.log('err', err));