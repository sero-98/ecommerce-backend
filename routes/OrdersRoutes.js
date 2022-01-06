const express = require('express');
const { check } = require('express-validator');

const { 
  newOrder,
  getOrder,
  myOrders,
  getOrders,
  updateOrder,
  deleteClothe,
} = require('../controllers/OrdersControllers');

const {
  validateFields,
  validateJWT,
  esAdminRole,
  tieneRole,
} = require('../middlewares');

const { 
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
} = require('../helpers/db-validators');


const orderRouter = express.Router();


orderRouter.post(
  '/',
  validateJWT,
  tieneRole('USER_ROLE', 'ADMIN_ROLE'),
  newOrder,
);


orderRouter.get(
  '/:id', 
  validateJWT,
  tieneRole('USER_ROLE', 'ADMIN_ROLE'),
  getOrder,
);


orderRouter.get(
  '/me', 
  validateJWT,
  tieneRole('USER_ROLE', 'ADMIN_ROLE'),
  myOrders,
);


orderRouter.get(
  '/admin/orders', 
  validateJWT,
  esAdminRole,
  getOrders,
);


orderRouter.put(
  '/admin/orders/:id', 
  validateJWT,
  esAdminRole,
  updateOrder,
);


orderRouter.delete(
  '/admin/orders/:id', 
  validateJWT,
  esAdminRole,
  deleteClothe,
);


module.exports = orderRouter;