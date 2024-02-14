const express = require('express');
const cors = require('cors'); 
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const knex = require('knex')
const handleNavigationToCodeBlock = require('./controllers/navigateToCodeBlock');
const handleSocketConnection = require('./socketHandlers');

const db = knex({
    client: 'pg',
    connection: {
      host : 'viaduct.proxy.rlwy.net',
      user : 'postgres',
      port : '32326',
      password : 'E3GFCgEGE14E5BdC*3a6E3ec*eadEBg2',
      database : 'railway'
    }
});

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
      origin: '*',
    }
  });

app.use(cors());

app.get('/', (req, res) => {
    db.select('*').from('codeblocks')
    .then(codeblock => res.send(codeblock))
});

app.get('/codeblock/:id', (req, res) => { handleNavigationToCodeBlock.handleNavigationToCodeBlock(req, res, db)});

handleSocketConnection(io); // initialize socket logic

server.listen('https://main--resplendent-bubblegum-a0f262.netlify.app/', () => {
    console.log('server running');
  });
