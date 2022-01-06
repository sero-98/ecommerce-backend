const Clothe_User = require('../models/clothe-user');
const User = require('../models/user');
const Clothe = require('../models/clothe');


const getClothesUsers = async (req, res, next) => {
  try{
    const clothes_users = await Clothe_User.find();
    
    res.status(200).json({
      data: clothes_users,
      message: 'Clothes_Users listed',
    });
  } catch(err){
    next(err);
  };
};


const getClotheUSer= async (req, res, next) => {
  const id = req.params.id;

  try{
    const clothe_user = await Clothe_User.findOne({ _id: id });

    res.status(200).json({ 
      data: clothe_user,  
      message: 'Clothe_User retrieved',
    });
  } catch(error){
    next(error);
  };
};


const createClotheUser = async (req, res, next) => {
  const { rating, clothe, user } = req.body;

  try{
    const newClotheUSer = new Clothe_User({
      rating, clothe, user
    });

    const createdClotheUser = await newClotheUSer.save();

    //guardar en la tabla de usuario
    const userr = await User.findById({ _id: user });
    userr.user_clothe.push(newClotheUSer);
    await userr.save();

    //guardar en la tabla de prendas
    const clother = await Clothe.findById({ _id: clothe });
    clother.user_clothe.push(newClotheUSer);
    await clother.save();

    res.status(201).json({ 
      data: createdClotheUser,  
      message: 'Clothe_User created',
    });
  } catch(error){
    next(error);
  };
};


const updateClotheUser = async (req, res, next) => {
  const id = req.params.id;
  const { rating } = req.body;

  try{
    const clothe_user = await Clothe_User.findById(id);

    if(clothe_user){
      clothe.rating = rating;

      const updatedClotheUser = await clothe_user.save();

      res.status(200).json({ 
        data: updatedClotheUser,  
        message: 'Clothe_User updated',
      });
    }
  } catch(error){
    next(error);
  };
};


const deleteClotheUser = async (req, res, next) => {
  const id = req.params.id;

  try{
    const clothe_user = await Clothe_User.findById(id);

    if(clothe_user){
      const deletedClotheUser = await clothe_user.remove();

      res.status(200).json({ 
        data: deletedClotheUser,  
        message: 'Clothe_User deleted',
      });
    }
  } catch(error){
    next(error);
  };
};


module.exports = {
  getClothesUsers,
  getClotheUSer,
  createClotheUser,
  updateClotheUser,
  deleteClotheUser,
};