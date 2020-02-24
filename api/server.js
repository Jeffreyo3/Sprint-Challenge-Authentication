const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(morgan('dev'));
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

// Alive messages
server.get('/', (req, res) => {
    res.send(`<h2>jeffreyo3's server is alive</h2>`);
});
server.get('/api', (req, res) => {
    res.send(`<h2>Use /api/endpoint...</h2>`);
});

module.exports = server;
