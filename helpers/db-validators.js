const Role = require('../models/role');
const User = require('../models/user');
const Category = require('../models/category');
const Clothe = require('../models/clothe');


const esRoleValido = async ( rol = '' ) => {
  const existeRol = await Role.findOne({ rol });
  if( !existeRol ){
    throw new Error(`El rol ${rol} no est registrado en la base de datos`);
  }
}


const esCategoryValido = async ( category = '' ) => {
  const existeCategory = await Category.findOne({ category });
  if( !existeCategory ){
    throw new Error(`La categoria ${category} no esta registrado en la base de datos`);
  }
}


const emailExiste = async ( email = '' ) => {
  // Check if the mail exists
  const existEmail = await User.findOne({ email });
  if( existEmail ) {
    throw new Error(`El correo: ${ correo }, ya está registrado`);
  }
}


const existeUsuarioPorId = async ( id ) => {
  // Check if the user exists
  const existUsuario = await User.findById(id);
  if( !existUsuario ) {
    throw new Error(`El id no existe: ${ id }`);
  }
}


const existeCategoriaPorId = async ( id ) => {
  // Check if the category exists
  const existCategoria = await Category.findById(id);
  if( !existCategoria ) {
    throw new Error(`El id no existe: ${ id }`);
  }
}


const existeClothePorId = async ( id ) => {
  // Check if the category exists
  const existClothe = await Clothe.findById(id);
  if( !existClothe ) {
    throw new Error(`El id no existe: ${ id }`);
  }
}


module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
  esCategoryValido,
  existeCategoriaPorId,
  existeClothePorId,
};