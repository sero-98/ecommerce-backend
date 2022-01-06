const express = require('express');

const {
  getClothesUsers,
  getClotheUSer,
  createClotheUser,
  updateClotheUser,
  deleteClotheUser
} = require('../controllers/ClothesUsersController');


const clothe_userRouter = express.Router();


clothe_userRouter.get(
  '/',
  getClothesUsers,
);

clothe_userRouter.get(
  '/:id',
  getClotheUSer,
);

clothe_userRouter.post(
  '/',
  createClotheUser,
);

clothe_userRouter.put(
  '/:id',
  updateClotheUser,
);

clothe_userRouter.delete(
  '/:id',
  deleteClotheUser,
);

module.exports = clothe_userRouter;