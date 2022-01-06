const Clothe = require('../models/clothe');
const Image = require('../models/image');


const Cloudinary = require('../services/cloudinary.js');


// Get all clothes
const getClothes = async (req, res) => {

  const { limite=10, desde=0 } = req.query;
  const query = { state: true };


  const [ total, clothes ] = await Promise.all([
    Clothe.countDocuments(query),
    Clothe.find(query)
      .populate('user', 'name')
      .populate('category', 'name')
      .populate('image', 'url')
      .skip( Number(desde) )
      .limit( Number(limite) ),
  ]);
    

  res.status(200).json({
    total: total,
    clothes: clothes,
    message: 'Clothes listed',
  });

};


// Get all clothes (admin)
const getAdminClothes = async (req, res) => {

  const query = { state: true };

  const clothes = await Clothe.find(query)
    .populate('user', 'name')
    .populate('category', 'name')
    .populate('image', 'url');


  res.status(200).json({
    clothes: clothes,
    message: 'Clothes listed',
  });

}


// Get Product Details
const getClotheDetails = async (req, res) => {
  
  const id = req.params.id;

  const clothe = await Clothe.findOne({ _id: id })
    .populate('user', 'name')
    .populate('category', 'name')
    .populate('image', 'url');


  res.status(200).json({ 
    data: clothe,  
    message: 'Clothe retrieved',
  });

};


// Create Product -- Admin
const createClothe = async (req, res) => {

  const uniqueFilename = new Date().toISOString();

  const result = await Cloudinary.uploader.upload(
    req.file.path, 
    "path/to/file",
    { 
      folder: "ecommerce/clothes", 
      public_id: `${uniqueFilename}`, 
      tags: `avatar` 
    }
  );

  const { 
    name, 
    description,
    price, 
    rating,
    mark,
    stock, 
    numOfReviews, 
    category,
  } = req.body;

  
  // Create image
  const image = new Image({
    public_id: result.public_id,
    url: result.secure_url,
  })
  

  // Create clothe
  const clothe = new Clothe({
    name, 
    description,
    price, 
    rating,
    mark,
    stock, 
    numOfReviews, 
    category,
    image: image._id,
    user: req.user.id,
  });


  //save in BD
  await Promise.all([
    image.save(),
    clothe.save(),
  ])
  //await image.save();
  //await clothe.save();


  res.json({ 
    message: 'Clothe created',
    clothe: clothe,  
  });

};


// Update Clothe -- Admin
const updateClothe = async (req, res) => {
  
  const { id } = req.params;
  
  const { state, user, ...resto} = req.body;


  //if( resto.image !== '' || resto.image !==undefined ) {

   /* const clothe = await Clothe.findById(id);
    const imageNew = await Image.findById(clothe.image)
    const uniqueFilename = new Date().toISOString();

    console.log('🔥🔥🔥',imageNew);
    console.log(req.file.path)

    //if( req.file.path !== '') {

      await Cloudinary.uploader.destroy(imageNew.public_id);

      const result = await Cloudinary.uploader.upload(
        req.file.path, 
        "path/to/file",
        { 
          folder: "ecommerce/clothes", 
          public_id: `${uniqueFilename}`, 
          tags: `avatar` 
        }
      );

      console.log(result)
      console.log(imageNew.public_id)
      
      imageNew.public_id = result.public_id;
      imageNew.secure_url = result.secure_url;

      console.log(imageNew.public_id)

      const i = await imageNew.save();
        console.log(i)
    //}*/

  // Actualizar usuario
  const clothe = await Clothe.findByIdAndUpdate(id, resto, { new: true });
  

  res.status(200).json({ 
    clothe: clothe,  
    message: 'Clothe updated',
  });
  
};


// Delete Clothe -- Admin
const deleteClothe = async (req, res) => {

  const id = req.params.id;


  const clothe = await Clothe.findByIdAndUpdate( id, { state: false } );


  res.status(200).json({ 
    clothe: clothe._id,  
    message: 'Clothe deleted',
  });

};


module.exports = {
  getClothes,
  getAdminClothes,
  getClotheDetails,
  createClothe,
  updateClothe,
  deleteClothe,
};