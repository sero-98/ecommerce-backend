const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
      unique: true,
    },
    state: {
      type: Boolean,
      default: true,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    }
  },
  {
    timestamps: true, 
  }
);

categorySchema.methods.toJSON = function() {
  const { __v, updatedAt, state, ...category  } = this.toObject();
  return category;
}

const Category = mongoose.model('categorys', categorySchema);

module.exports = Category;