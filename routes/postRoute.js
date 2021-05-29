const express = require('express')
const router = express.Router()
const { isAuth } = require('../middleware/utils')
const { createPost, getPostById, getPosts } = require('../controllers/post.controller')

router.post('/create', isAuth, createPost);

router.get('/:id', isAuth, getPostById)

router.get('/', isAuth, getPosts)

module.exports = router