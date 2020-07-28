const express = require('express')
const router = express.Router()
const blogController = require('../controllers/blogController')

// get routes
router.get('/', blogController.blog_index) 
router.get('/create', blogController.blog_create_get)
router.get('/:id', blogController.blog_details)

// post routes
router.post('/', blogController.blog_create_post)

// delete routes
router.delete('/:id', blogController.blog_delete)

module.exports = router