var hydraExpress = require('hydra-express');
var hydra = hydraExpress.getHydra();
var config = require('./config.json');

function getRandomInt(max) {
  
   return Math.floor(Math.random() * Math.floor(max));

}

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

randomTemp = getRandomInt(4);

switch(randomTemp) {
    case 0:
        meteo += " - Chaud";
        break;
    case 1:
        meteo += " - Froid";
        break;
    case 2:
        meteo += " - De saison";
        break;
    case 3:
        meteo += " - Doux";
}

randomGeo = getRandomInt(4);

switch(randomGeo) {
    case 0:
        meteo += " - Annecy";
        break;
    case 1:
        meteo += " - Lyon";
        break;
    case 2:
        meteo += " - Paris";
        break;
    case 3:
        meteo += " - Chambery";
}

date = new Date();

hydraExpress.init(config, () => {})
  .then((serviceInfo) => {
    console.log('serviceInfo', serviceInfo);
    hydra.on('message', (message) => {
      let messageReply = hydra.createUMFMessage({
        to: 'modif:/',
        frm: 'bulletin:/',
        bdy: {
          msg: `Bulletin meteo du ${date} - ${meteo}`
        }
      });
      hydra.sendMessage(messageReply);
    });
    return 0;
  })
  .catch(err => console.log('err', err));