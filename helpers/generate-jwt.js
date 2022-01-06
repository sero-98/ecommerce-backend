const jwt = require('jsonwebtoken');

const { config } = require('../config/config.js');

// uid = '' -> siempre sera un String el uid
const generateJWT = (uid = '') => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(payload, config.jwt_secret, { 
      expiresIn: '4h'
    }, (err, token) => {
      if(err){
        console.log(err);
        reject('The token could not be generated')
      } else{
        resolve(token);
      }
    })
  })
};

module.exports = {
  generateJWT
}