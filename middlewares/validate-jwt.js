const { request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { config } = require('../config/config');

const validateJWT = async ( req=request, res, next ) => {

  //const authorization = req.headers.authorization;
  const authorization = req.header('Authorization');

  if(!authorization) {
    return res.status(401).json({ 
      message: 'No Bearer Token Valid' 
    });
  }
  

  const token = authorization.slice(7, authorization.length); // Bearer XXXXXX

  if(!token) {
    return res.status(401).json({
      message: 'No hay token en la peticion'
    });
  }


  try{

    const { uid } = jwt.verify(token, config.jwt_secret);


    // leer el usuario que corresponde al uid
    const user = await User.findById(uid);

    if(!user) {
      return res.status(401).json({
        message: 'Token no válido - usuario no existe DB'
      });
    }
    

    // Verificar si el uid tiene estado true
    console.log(!user.state);
    if( !user.state ){
      return res.status(401).json({
        message: 'Token no válido - usuario con estado: false'
      });
    }

    req.user = user;

    next();

  } catch(error) {
    console.log(error);
    res.status(401).json({
      message: 'Token no valido'
    })
  }

};

module.exports = {
  validateJWT,
}