const bcrypt = require('bcrypt');

const User = require('../models/user.js');

const Cloudinary = require('../services/cloudinary.js');


// Register a User
const register = async (req, res) => {

  const uniqueFilename = new Date().toISOString();

  const myCloud = await Cloudinary.uploader.upload(
    req.file.path, 
    "path/to/file",
    { 
      folder: "ecommerce/avatars", 
      public_id: `${uniqueFilename}`, 
      tags: `avatar` 
    }
  );

  const { 
    name,
    email,
    password,
    state,
    rol,
  } = req.body;


  // Create user 
  const user = new User({
    name,
    email,
    password,
    state,
    rol,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    }
  });


  // Encrypt the password
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(req.body.password, salt);


  // Save in BD
  await user.save();

  // Response
  res.json({
    message: 'Registro exitoso',
    user: user,
  });

}

// Get User Detail
const getUserDetails = async (req, res) => {
  const user = await User.findById(req.user.id);


  res.status(200).json({
    user: user,
    message: 'User listed',
  });
};

// Actualizar contraseña
const updatePassword = async (req, res) => {

  const { password, newPassword } = req.body;

  if( !password ){
    return res.status(400).json({
      message: 'User / Password are not correct - password'
    })
  }


  const user = await User.findById(req.user.id);


  const isPasswordMatch = bcrypt.compareSync( password, user.password );

  console.log(isPasswordMatch);

  if( !isPasswordMatch ) {
    return res.status(400).json({
      message: 'User / Password are not correct - isPasswordMatch'
    })
  }


  if( newPassword ){
    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(newPassword, salt);
  }


  await user.save();


  res.status(200).json({ 
    user: user,  
    message: 'Password updated',
  });

}

// Actualizar Perfil
const updateProfile = async (req, res) => {

  const { _id, email, ...resto } = req.body;


  if( resto.avatar !== '' || resto.avatar !==undefined ) {
    console.log('paso')

    const user = await User.findById(req.user.id);
    const imageId = user.avatar.public_id;
    const uniqueFilename = new Date().toISOString();

    await Cloudinary.uploader.destroy(imageId);

    const myCloud = await Cloudinary.uploader.upload(
      req.file.path, 
      "path/to/file",
      { 
        folder: "ecommerce/avatars", 
        public_id: `${uniqueFilename}`, 
        tags: `avatar` 
      }
    );

    resto.avatar= {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    }

    /*resto.avatar.public_id = myCloud.public_id;
    resto.avatar.secure_url = myCloud.secure_url;*/
  }


  // Actualizar usuario
  const user = await User.findByIdAndUpdate(req.user.id, resto, { new: true });


  res.status(200).json({ 
    user: user,  
    message: 'User updated',
  });  

};


// Get all users (admin)
const getUsers = async (req, res) => {

  const { limite=5, desde=0 } = req.query;
  const query = { state: true };

  const [ total, users ] = await Promise.all([
    User.countDocuments(query),
    User.find(query)
        .skip( Number(desde) )
        .limit( Number(limite) )
  ]);


  res.status(200).json({
    total: total,
    users: users,
    message: 'Users listed',
  });

};


// Get user (admin)
const getUser = async (req, res) => {
  
  const { id } = req.params;

  const user = await User.findById(id);


  res.status(200).json({ 
    data: user,  
    message: 'User retrieved',
  });

};


// Actualizar rol de usuario (admin)
const updateUserRol = async (req, res) => {

  const { id } = req.params;
  const { rol } = req.body;


  const user = await User.findById(id);
  user.rol = rol;

  
  await user.save();


  res.status(200).json({ 
    user: user,  
    message: 'User Rol updated',
  });  

}


// Eliminacion logica del usuario (admin)
const deleteUser = async (req, res) => {
  
  const id = req.params.id;


  const user = await User.findByIdAndUpdate( id, { state: false } );


  res.status(200).json({ 
    user: user._id,  
    message: 'User deleted',
  });

};


module.exports = {
  register,
  getUserDetails,
  updatePassword,
  updateProfile,
  getUsers,
  getUser,  
  updateUserRol,
  deleteUser,
};