const express = require('express');
const cors = require('cors'); 
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const knex = require('knex')
const handleNavigationToCodeBlock = require('./controllers/navigateToCodeBlock');
const handleSocketConnection = require('./socketHandlers');
const PORT = process.env.PORT || 3000;
const db = knex({
  client: 'pg',
  connection: {
    host : process.env.PGHOST,
    user : process.env.PGUSER,
    port : process.env.PGPORT,
    password : process.env.PGPASSWORD,
    database : process.env.PGDATABASE
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

server.listen(PORT, () => {
    console.log('server running');
  });
