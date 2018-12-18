var hydraExpress = require('hydra-express');
var hydra = hydraExpress.getHydra();
var config = require('./config.json');
var bulletins = new Array();
function getRandomInt(max) {
  
   return Math.floor(Math.random() * Math.floor(max));

}

function genererBulletins(nbrBulletins){
	let bulletin = {
			date : null,
			meteo : null,
			temperature : null,
			ville : null
	}; 
	for (i=0 ; i<nbrBulletins ; i++){
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
		bulletin.meteo=randomMeteo;
		
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
		bulletin.temperature=randomTemp;
		
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
		bulletin.ville=randomVille;
		
		date = new Date();
		bulletin.date=date;
	
		bulletins.push(bulletin);
	}

	hydraExpress.init(config, () => {})
	  .then((serviceInfo) => {
		console.log('serviceInfo', serviceInfo);
		hydra.on('message', (message) => {
		  let messageReply = hydra.createUMFMessage({
			to: 'modif:/',
			frm: 'bulletin:/',
			bdy: bulletins
		  });
		  hydra.sendMessage(messageReply);
		});
		return 0;
	  })
	  .catch(err => console.log('err', err));
	  
 }
 
 //manque à appeler la fonction 
 var nbBull = readline.question("Combien de bulletins ajoutez-vous ?");
 genererBullletins(nbBull);