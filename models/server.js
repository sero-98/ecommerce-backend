const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const { config } = require('../config/config.js');
const { dbConnection } = require('../database/mongo');


class Server {

  constructor() {

    this.app   = express();
    this.port  = config.port;

    this.paths = {
      auth:      '/auth',
      users:     '/api/users',
      clothes:   '/api/clothes',
      categorys: '/api/categorys',
      orders:     '/api/orders'
    }

    // Conectar a base de datos
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();

  }


  async conectarDB() {

    await dbConnection();

  }


  middlewares() {

    // CORS
    this.app.use( cors() );

    // Lectura y parseo del body
    this.app.use( express.json() );
    this.app.use( express.urlencoded({ extended: true }) );

    // morgan
    this.app.use(logger('dev'));

  }


  routes() {  
      
    this.app.get('/', (req, res) => { res.send('Server is ready 🔥!!!') });

    this.app.use( this.paths.auth, require('../routes/AuthRoutes') );
    this.app.use( this.paths.users, require('../routes/UsersRoutes') );
    this.app.use( this.paths.clothes, require('../routes/ClothesRoutes') );
    this.app.use( this.paths.categorys, require('../routes/CategoryRoutes') );
    this.app.use( this.paths.orders, require('../routes/OrdersRoutes') );

  }


  listen() {

    this.app.listen( this.port, () => {
      console.log('Servidor corriendo en puerto', this.port );
      console.log(`🔥 http://localhost:${this.port}`);
    });

  }

}

module.exports = Server;