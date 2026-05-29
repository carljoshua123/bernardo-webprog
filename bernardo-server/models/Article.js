const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  imageUrl: { type: String },
  paragraphs: { type: [String], default: [] },
  status: { type: String, enum: ['Active', 'Disabled'], default: 'Active' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Article', ArticleSchema);