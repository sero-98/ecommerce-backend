const express = require('express');
const { check } = require('express-validator');
const upload = require('../middlewares/multer');


const {
  getClothes,
  getAdminClothes,
  getClotheDetails,
  createClothe,
  updateClothe,
  deleteClothe
} = require('../controllers/ClothesController');

const {
  validateFields,
  validateJWT,
  esAdminRole,
  tieneRole,
} = require('../middlewares');

const { 
  existeCategoriaPorId,
  existeClothePorId,
} = require('../helpers/db-validators');


const clotheRouter = express.Router();


clotheRouter.get(
  '/',
  getClothes,
);


clotheRouter.get(
  '/admin',
  validateJWT,
  esAdminRole,
  getAdminClothes,
);


clotheRouter.get(
  '/:id',
  [
    check('id', 'No es un ID valido')
      .isMongoId(),
    check('id')
      .custom( existeClothePorId ),
    validateFields,
  ],
  getClotheDetails,
);

clotheRouter.post(
  '/admin',
  validateJWT,
  esAdminRole, 
  upload.single("image"), 
  [
    check('name')
      .not().isEmpty()
      .withMessage('The name is required'),
    check('description')
      .not().isEmpty()
      .withMessage('The description is required'),
    check('price', 'The price is not valid')
      .isNumeric(),
    check('rating', 'The rating is not valid')
      .optional({ checkFalsy: true, nullable: true })
      .isNumeric()
      .isInt({min:1, max:5})
      .withMessage('rating is not int or rating is less than one or greater than five'),
    check('mark')
      .not().isEmpty()
      .withMessage('The mark is required'),
    check('stock', 'The stock is not valid')
      .isNumeric(),
    check('numOfReviews', 'The numOfReviews is not valid')
      .optional({ checkFalsy: true, nullable: true })
      .isNumeric(),
    check('category')
      .custom( existeCategoriaPorId ),
    validateFields
  ],
  createClothe,
);

clotheRouter.put(
  '/admin/:id',
  validateJWT,
  esAdminRole,
  upload.single("image"), 
  [
    check('id', 'No es un ID valido')
      .isMongoId(),
    check('id')
      .custom( existeClothePorId ),
    validateFields,
  ],
  updateClothe,
);

clotheRouter.delete(
  '/admin/:id',
  validateJWT,
  esAdminRole,
  [
    check('id', 'No es un ID valido')
      .isMongoId(),
    check('id')
      .custom( existeClothePorId ),
    validateFields,
  ],
  deleteClothe,
);

module.exports = clotheRouter;