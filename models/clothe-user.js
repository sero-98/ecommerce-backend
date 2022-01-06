const mongoose = require('mongoose');

const clothe_userSchema = new mongoose.Schema(
  {
    rating: { 
      type: Number,  
      //required: true,
    },
    clothe: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'clothes',
      //required: true,
    },
    user: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      //required: true,
    },
  },
  {
    timestamps: true, 
  }
);

clothe_userSchema.methods.toJSON = function() {
  const { __v, createdAt, updatedAt,  ...clothe_user  } = this.toObject();
  return clothe_user;
}

const Clothe_User = mongoose.model('clothes_users', clothe_userSchema);

module.exports = Clothe_User;