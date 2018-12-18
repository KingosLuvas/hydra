var hydraExpress = require('hydra-express');
var hydra = hydraExpress.getHydra();
var config = require('./config.json');
var readline = require('readline-sync');

config.hydra.serviceName = 'modif';

hydraExpress.init(config, () => {})
  .then((serviceInfo) => {
    console.log('serviceInfo', serviceInfo);

    hydra.on('message', (message) => { 
      console.log('message reply', message);
	
      var mess = message.bdy.msg;
	  var part = mess.split('-');
      var modif = readline.question("Modification ? (o/n) ");
	  
      if (modif === 'o') {
		change = readline.question("Modifier le temps ");
		part[1] = change;
      }
   
  
      

    let messageReply = hydra.createUMFMessage({
      to: 'affiche:/',
      frm: 'modif:/',
      bdy: {
        msg: `${part}`
      }
    });

    hydra.sendMessage(messageReply);
  });
return 0;
})
  .catch(err => console.log('err', err));