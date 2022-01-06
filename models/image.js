const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
  {
    public_id: {
      type: String,
      //required: true,
    },
    url: {
      type: String,
      //required: true,
    },
  }, 
  {
    timestamps: true, 
  }
);


imageSchema.methods.toJSON = function() {
  const { __v, updatedAt,  ...img  } = this.toObject();
  return img;
}


const Image = mongoose.model('images', imageSchema);

module.exports = Image;