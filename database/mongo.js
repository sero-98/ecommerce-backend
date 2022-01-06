const mongoose = require('mongoose');

const { config } = require('../config/config.js');

const dbConnection = async () => {

  try {
    await mongoose.connect(config.mongodb_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Base de datos online');
  } catch (error) {
    console.log(error);
    throw new Error('Error a la hora de iniciar la base de datos')
  }

}

module.exports = {
  dbConnection
}