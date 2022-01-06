const express = require('express');
const { check } = require('express-validator');
const upload = require('../middlewares/multer');

const { 
  register,
  getUserDetails,
  updatePassword,
  updateProfile,
  getUsers,
  getUser,  
  updateUserRol,
  deleteUser,
} = require('../controllers/UsersController');

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


const userRouter = express.Router();


userRouter.post(
  '/register',
  upload.single("image"), 
  [
    check('name')
      .not().isEmpty()
      .withMessage('The name is required')
      .isAlpha()
      .withMessage('Must be only alphabetical chars'),
    check('password')
      .isLength({ min: 6 })
      .withMessage('The password must be more than 6 letters'),
    check('email')
      .isEmail()
      .withMessage('TThe email is not valid'),
    check('email')
      .custom( emailExiste ),
    check('rol')
      .custom( esRoleValido ),
    validateFields
  ], 
  register,
);


userRouter.get(
  '/me', 
  validateJWT,
  tieneRole('USER_ROLE', 'ADMIN_ROLE'),
  getUserDetails,
);


userRouter.put(
  '/password/update', 
  validateJWT,
  tieneRole('USER_ROLE', 'ADMIN_ROLE'),
  [
    check('password')
      .isLength({ min: 6 })
      .withMessage('The password must be more than 6 letters'),
    check('newPassword')
      .isLength({ min: 6 })
      .withMessage('The password must be more than 6 letters'),
    validateFields
  ], 
  updatePassword,
);


userRouter.put(
  '/me/update', 
  validateJWT,
  upload.single("image"), 
  tieneRole('USER_ROLE', 'ADMIN_ROLE'),
  [
    check('name')
      .not().isEmpty()
      .withMessage('The name is required')
      .isAlpha()
      .withMessage('Must be only alphabetical chars'),
    validateFields
  ], 
  updateProfile,
);


userRouter.get(
  '/admin', 
  validateJWT,
  esAdminRole,
  getUsers,
);


userRouter.get(
  '/admin/:id',
  validateJWT,
  esAdminRole, 
  [
    check('id', 'No es un ID valido')
      .isMongoId(),
    check('id')
      .custom( existeUsuarioPorId ),
    validateFields,
  ],
  getUser,
);


userRouter.put(
  '/admin/:id', 
  validateJWT,
  esAdminRole,
  [
    check('id', 'No es un ID valido')
      .isMongoId(),
    check('id')
      .custom( existeUsuarioPorId ),
    check('rol')
      .custom( esRoleValido ),
    validateFields,
  ],
  updateUserRol,
);


userRouter.delete(
  '/admin/:id', 
  validateJWT,
  esAdminRole,
  [
    check('id', 'No es un ID valido')
      .isMongoId(),
    check('id')
      .custom( existeUsuarioPorId ),
    validateFields,
  ],
  deleteUser,
);


module.exports = userRouter;