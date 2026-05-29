const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

// Get all articles
router.get('/', articleController.getArticles);

// Create new article
router.post('/', articleController.createArticle);

// Update article
router.put('/:id', articleController.updateArticle);

// Delete article
router.delete('/:id', articleController.deleteArticle);

module.exports = router;
