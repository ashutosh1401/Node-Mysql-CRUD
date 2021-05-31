const express = require('express')
const router = express.Router()
const { isAuth } = require('../middleware/utils')
const { createPost, getPostById, getPosts, deletePost } = require('../controllers/post.controller')

router.post('/create', isAuth, createPost);

router.get('/:id', isAuth, getPostById)

router.get('/', isAuth, getPosts)

router.delete('/:id', isAuth, deletePost)

module.exports = router