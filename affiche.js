var hydraExpress = require('hydra-express');
var hydra = hydraExpress.getHydra();
var config = require('./config.json');

config.hydra.serviceName = 'affiche';

hydraExpress.init(config, () => {})
  .then((serviceInfo) => {
    console.log('serviceInfo', serviceInfo);

    hydra.on('message', (message) => {
      console.log('message reply', message);

      if (message.frm=='user:/') {
        let response   = hydra.createUMFMessage({
          to: 'stock:/',
          frm: 'affiche:/',
          bdy: {
            msg : 'bulletinsRequest'
          }
        });
        hydra.sendMessage(response);
      }


      if (message.frm=='stock:/') {
        // stock me renvoit mon tableau de bulletins
        // il faut maintenant créer du code ici pour l'afficher sur la page "/show" , si possible
      }

    });

    


    
  })
  .catch(err => console.log('err', err));