const Category = require('../models/category.js');


const getCategorys = async (req, res) => {

  const { limite=5, desde=0 } = req.query;
  const query = { state: true };


  const [ total, categorys ] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query)
      .skip( Number(desde) )
      .limit( Number(limite) )
      .populate('user', 'name'),
  ]);
    

  res.status(200).json({
    total: total,
    categorys: categorys,
    message: 'Categorys listed',
  });

};


const getCategory = async (req, res, next) => {
  
  const id = req.params.id;

  const category = await Category
    .findOne({ _id: id })
    .populate('user', 'name');


  res.status(200).json({ 
    data: category,  
    message: 'Categorys retrieved',
  });

};


const createCategory = async (req, res) => {

  const name = req.body.name.toUpperCase();

  const categoryDb = await Category.findOne({ name });

  if(categoryDb){
    return res.status(400).json({
      message: `La categoria ${ categoryDb.name }, ya existe`
    });
  }
  
  //Generar la data a guardar
  const data = {
    name,
    user: req.user._id,
  }

  const category = new Category( data );

  //save in BD
  await category.save();


  res.json({ 
    message: 'Category created',
    clothe: category,  
  });

};


const updateCategory = async (req, res, next) => {
  
  const { id } = req.params;

  const { state, user, ...data } = req.body;


  data.name = data.name.toUpperCase();
  data.user = req.user._id;

  //{ new: true } -> PARA QUE MANDE EL NUEVO DOCUMENTO ACTUALIZADO
  const category = await Category.findByIdAndUpdate(id, data, { new: true });


  res.status(200).json({ 
    data: category,  
    message: 'Category updated',
  });
  
};


const deleteCategory = async (req, res) => {
  
  const { id } = req.params;

  const category = await Category.findByIdAndUpdate( id, { state: false }, {new: true });

  res.status(200).json({ 
    data: category,  
    message: 'Category deleted',
  });

};


module.exports = {
  getCategorys,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};