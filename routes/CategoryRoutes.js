const express = require('express');
const { check } = require('express-validator');

const {
  getCategorys,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/CategoryRestController');

const {
  validateFields,
  validateJWT,
  esAdminRole,
  tieneRole,
  cacheInit,
} = require('../middlewares');

const { 
  existeCategoriaPorId,
} = require('../helpers/db-validators');



const categoryRouter = express.Router();


categoryRouter.get(
  '/',
  getCategorys,
);


categoryRouter.get(
  '/:id',
  [
    check('id', 'No es un ID valido')
      .isMongoId(),
    check('id')
      .custom( existeCategoriaPorId ),
    validateFields,
  ],
  getCategory,
);


categoryRouter.post(
  '/',
  validateJWT,
  esAdminRole,
  [
    check('name')
      .not().isEmpty()
      .withMessage('The name is required')
      .isAlpha()
      .withMessage('Must be only alphabetical chars'),
    validateFields
  ],
  createCategory,
);


categoryRouter.put(
  '/:id',
  validateJWT,
  esAdminRole,
  [
    check('name')
      .not().isEmpty()
      .withMessage('The name is required')
      .isAlpha()
      .withMessage('Must be only alphabetical chars'),
    check('id')
      .custom( existeCategoriaPorId ),
    validateFields
  ],
  updateCategory,
);

categoryRouter.delete(
  '/:id',
  validateJWT,
  esAdminRole,
  [
    check('id', 'No es un ID valido')
      .isMongoId(),
    check('id')
      .custom( existeCategoriaPorId ),
    validateFields,
  ],
  deleteCategory,
);

module.exports = categoryRouter;