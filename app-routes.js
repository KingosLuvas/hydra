/**
 * @name hello-v1-api
 * @description This module packages the Hello API.
 */
'use strict';

const hydraExpress = require('hydra-express');
const hydra = hydraExpress.getHydra();
const express = hydraExpress.getExpress();
const ServerResponse = hydra.getServerResponseHelper();
let serverResponse = new ServerResponse();

let api = express.Router();

api.get('/', (req, res) => {
  serverResponse.sendOk(res, {
    result: {
      msg: `hello from ${hydra.getServiceName()} - ${hydra.getInstanceID()}`
    }
  });
});



////////////////////////////////////////////////////////////////////
api.get('/html', (req, res) => {
  res.writeHead(ServerResponse.HTTP_OK, {
    'Content-Type': 'text/html'
  });
  res.write(`
    <html>
    <body>
      <h1>Application Hydra bulletin !!</h1>
      <br><br>

      <form method="get" action="/v1/add">
        <button type="submit">Generer un bulletin</button>
      </form>

      <form method="get" action="/v1/show">
        <button type="submit">Afficher les bulletins</button>
      </form>

    </body>
    </html>
  `);
  res.end();
});


//////////////////////////////////////////////////////////////////// 
api.get('/add', (req, res) => {
  let messageReply = hydra.createUMFMessage({
    to: 'genere:/',
    frm: 'user:/',
    bdy: {
      msg: `generateBulletin`
    }
    });
  hydra.sendMessage(messageReply);
  res.writeHead(ServerResponse.HTTP_OK, {
    'Content-Type': 'text/html'
  });
  res.write(`
    <html>
    <body>
      <h1>Application Hydra bulletin !!</h1>
      <br><br>

      <form method="get" action="/v1/add">
        <button type="submit">Generer un bulletin</button>
      </form>

      <form method="get" action="/v1/show">
        <button type="submit">Afficher les bulletins</button>
      </form>

    </body>
    </html>
    <script type="text/javascript">
      alert("Un bulletin a ete genere.");
    </script>
  `);
  res.end();
});


////////////////////////////////////////////////////////////////////
api.get('/show', (req, res) => {
  let messageReply = hydra.createUMFMessage({
    to: 'affiche:/',
    frm: 'user:/',
    bdy: {
      msg: `affiche`
    }
    });
  hydra.sendMessage(messageReply);
  
  res.writeHead(ServerResponse.HTTP_OK, {
    'Content-Type': 'text/html'
  });
  res.write(`
    <html>
    <body>
      <h1>Les bulletins :</h1>
      <br><br>
      <div id="bulletins"></div>

      <br><br>
      <form method="get" action="/v1/html">
        <button type="submit">Retour</button>
      </form>
    </body>
    </html>
  `);
  res.end();
});



//////////////////////////////////////////////////////////////////// OSEF DE CA
api.get('/test', (req, res) => {
	let messageReply = hydra.createUMFMessage({
			to: 'genere:/',
			frm: 'user:/',
			bdy: {
				msg: `generateBulletin`
			}
		  });
	hydra.sendMessage(messageReply);
  res.json({
    result: {
      msg: `hello from ${hydra.getServiceName()} - ${hydra.getInstanceID()}`
    }
  });
});

////////////////////////////////////////////////////////////////////
api.get('/image', (req, res) => {
  let segments = __dirname.split('/'); // Note: change '/' on machines running Windows.
  segments.pop();
  let path = segments.join('/');
  res.sendFile(`${path}/hydra.png`);
});

api.post('/post', (req, res) => {
  res.json({
    result: {
      msg: 'Post recieved',
      a: req.body.a,
      b: req.body.b
    }
  });
});

api.get('/slow', (req, res) => {
  setTimeout(() => {
    res.json({
      result: {
        msg: 'Post recieved',
        a: req.body.a,
        b: req.body.b
      }
    });
  }, 30000);
});

module.exports = api;


