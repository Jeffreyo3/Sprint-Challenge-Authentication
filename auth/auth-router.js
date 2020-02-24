const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Import secret to use for JWT
const secret = require('../config/secret');
// User must create a config folder containing a file 
// secrets.js must contain an object with the secret key titled jwtSecret

const User = require('../models/authModel');

router.get('/', (req, res) => {
  res.send(`<h2>Auth Route is alive.</h2>`)
})

router.post('/register', (req, res) => {
  // implement registration
  if (!req.body || !req.body.password || !req.body.username) {
    res.status(400).json({ message: "Username and password are required." });
  } else {
    let newUser = req.body;
    const hash = bcrypt.hashSync(newUser.password, 11);
    newUser.password = hash;

    User.add(newUser)
      .then(saved => {
        const token = getToken(saved);
        res.status(201).json({ created_user: saved, token: token });
      })
      .catch(err => {
        res.status(500).json({ error: `Error adding new User: ${err.message}` })
      })
  }
});

router.post('/login', (req, res) => {
  // implement login
  if (!req.body || !req.body.password || !req.body.username) {
    res.status(400).json({ message: "Username and password are required." });
  } else {
    let { username, password } = req.body;

    User.findFilter({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = getToken(user);
          res.status(200).json({ username: user.username, token: token });
        } else {
          res.status(401).json({ message: "Invalid login credentials" });
        }
      })
      .catch(err => {
        res.status(500).json({ error: `Error attempting login: ${err.message}` })
      })
  }
});

function getToken(user) {
  const tokenPayload = {
    userid: user.id,
    username: user.username,
    roles: ["User"]
  };
  const options = { expiresIn: "1h" };
  const token = jwt.sign(tokenPayload, secret.jwtSecret, options);

  return token;
}

module.exports = router;
