const mongoose = require("mongoose")

const bookmarkSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  url: String,
  source: String,
  image: String,
});

module.exports = mongoose.model('Bookmark', bookmarkSchema);
