const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema(
  {
    rol: {
      type: String,
      required: [true, 'rol is required'],
      default: 'USER_ROLE',
      //enum: ['ADMIN_ROLE', 'USER_ROLE']
    }
  },
  {
    timestamps: true, 
  }
);


roleSchema.methods.toJSON = function() {
  const { __v, updatedAt,  ...role  } = this.toObject();
  return role;
}


const Role = mongoose.model('roles', roleSchema);

module.exports = Role;