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
      host : 'viaduct.proxy.rlwy.net:32326',
      user : POSTGRES_USER,
      port : '5432',
      password : POSTGRES_PASSWORD,
      database : 'POSTGRES_DB'
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
