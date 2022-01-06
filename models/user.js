const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String,  
      required: [true, 'Please enter a full name'],
    },
    email: {
      type: String, 
      //lowercase: true, 
      required: [true, 'Email is required'],
      unique: true, 
    },
    password: { 
      type: String, 
      required: [true, 'Password is required'],
    },
    avatar: {
      public_id: {
        type: String,
        default: 'ecommerce/avatars/2021-12-30T20:25:04.072Z'
        //required: true,
      },
      url: {
        type: String,
        default: 'https://res.cloudinary.com/sero98/image/upload/v1640895909/ecommerce/avatars/2021-12-30T20:25:04.072Z.jpg'
        //required: true,
      },
    },
    state: {
      type: Boolean, 
      default: true,
    },
    rol: { 
      type: String,
      required: true,
      default: 'USER_ROLE',
      //emun: ['ADMIN_ROLE', 'USER_ROLE']
    }
  },
  {
    timestamps: true, 
  }
);


userSchema.methods.toJSON = function() {
  const { __v, password, updatedAt, state, _id,  ...user  } = this.toObject();
  user.uid = _id;
  return user;
}


const User = mongoose.model('users', userSchema);

module.exports = User;