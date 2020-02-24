const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Import secret to use for JWT
const secret = require('../config/secrets')
// User must create a config folder containing a file 
// secrets.js must contain an object with the secret key titled jwtSecret

router.post('/register', (req, res) => {
  // implement registration
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
