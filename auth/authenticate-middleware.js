/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require('jsonwebtoken');
// Import secret to use for JWT
const secret = require('../config/secret');
// User must create a config folder containing a file 
// secret.js must contain an object with the secret key titled jwtSecret

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (req.decodedJWT) {
    next();
  } else if (token) {
    jwt.verify(token, secret.jwtSecret, (err, decodedJWT) => {
      if (err) {
        res.status(401).json({ message: "You do not have access to this." });
      } else {
        req.decodedJWT = decodedJWT;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Please login to get access to this." });
  }
};
