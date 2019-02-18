var hydraExpress = require('hydra-express');
var hydra = hydraExpress.getHydra();
var config = require('./config.json');

	 
config.hydra.serviceName = 'genere';

function getRandomInt(max) {
   return Math.floor(Math.random() * Math.floor(max));
}

function genererBulletin(){
	
	let bulletin = {
			date : null,
			meteo : null,
			temperature : null,
			ville : null
	}; 
	var jr = getRandomInt(30)+1;
		randomMeteo = getRandomInt(5);
		switch(randomMeteo) {
			case 0:
				meteo = "Brouillard givrant";
				break;
			case 1:
				meteo = "Grand beau temps";
				break;
			case 2:
				meteo = "Pluie";
				break;
			case 3:
				meteo = "Vent fort";
				break;
			case 4:
				meteo = "Nuageux";
		}
		bulletin.meteo=meteo;
		
		randomTemp = getRandomInt(4);

		switch(randomTemp) {
			case 0:
				temperature = "Chaud";
				break;
			case 1:
				temperature = "Froid";
				break;
			case 2:
				temperature = "De saison";
				break;
			case 3:
				temperature = "Doux";
		}
		bulletin.temperature=temperature;
		
		randomVille = getRandomInt(4);

		switch(randomVille) {
			case 0:
				ville = "Annecy";
				break;
			case 1:
				ville = "Lyon";
				break;
			case 2:
				ville = "Paris";
				break;
			case 3:
				ville = "Chambery";
		}
		bulletin.ville=ville;
		

		date = jr+"/01/2019";
		bulletin.date=date;
		console.log("Nouveau bulletin :");
		console.log(bulletin);
		return bulletin;
}

hydraExpress.init(config, () => {})
  .then((serviceInfo) => {
    console.log('serviceInfo', serviceInfo);

    hydra.on('message', (message) => {
	  console.log("Nouveau message :");
      console.log('message reply', message);
	  
	  var bull = genererBulletin();
	  let response = hydra.createUMFMessage({
      to: 'stock:/',
      frm: 'genere:/',
      bdy: {
		date : bull.date,
		meteo : bull.meteo,
		temperature : bull.temperature,
		ville : bull.ville
	  }
    });

    hydra.sendMessage(response);
    });


  })
  .catch(err => console.log('err', err));
  
	  
