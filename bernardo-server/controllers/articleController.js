const Article = require('../models/Article');

// Get all articles
exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new article
exports.createArticle = async (req, res) => {
  try {
    const { slug, title, imageUrl, paragraphs, status } = req.body;
    const article = new Article({ slug, title, imageUrl, paragraphs, status });
    await article.save();
    res.status(201).json(article);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update article
exports.updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { slug, title, imageUrl, paragraphs, status } = req.body;
    const article = await Article.findByIdAndUpdate(
      id,
      { slug, title, imageUrl, paragraphs, status },
      { new: true }
    );
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json(article);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete article
exports.deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findByIdAndDelete(id);
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json({ message: 'Article deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
