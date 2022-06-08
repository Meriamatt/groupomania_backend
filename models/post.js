const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    required: true
  },
  usersLiked: {
    type: ["String <userId>"],
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  isLiked: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('post', postSchema);