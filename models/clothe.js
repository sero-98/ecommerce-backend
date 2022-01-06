const mongoose = require('mongoose');

const clotheSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, 'Name clothe is required'], 
    },
    description: { 
      type: String, 
      required: [true, 'Description clothe is required'], 
    },
    price: {
      type: Number, 
      required: [true, 'Price clothe is required'],  
    },
    rating: { 
      type: Number,
      default: 0,
    },
    image: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'images',
      required: true,
    },
    category: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'categorys',
      required: true,
    },
    stock: { 
      type: Number, 
      required: [true, 'Stock clothe is required'], 
      default: 1,
    },
    mark: {
      type: String,
      required: [true, 'Mark clothe is required'],  
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    state: {
      type: Boolean,
      default: true,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },    
  },
  {
    timestamps: true, 
  }
);


clotheSchema.methods.toJSON = function() {
  const { __v, state, updatedAt,  ...clothe  } = this.toObject();
  return clothe;
}


const Clothe = mongoose.model('clothes', clotheSchema);

module.exports = Clothe;