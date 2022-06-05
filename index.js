require('dotenv').config();
const config = require('./config.json');
const Client = require('./structures/RadioClient');
const client = new Client({
      token: process.env.TOKEN,
      prefix: '?',
      nodes: config.nodes,
      owners: []
});

client.connect();