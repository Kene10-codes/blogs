const express = require('express')
const {
    getBlog,
    updateBlog,
    getBlogs,
    deleteBlog,
    postBlog,
} = require('../controllers/blog')
const router = express.Router()

router.get('/', getBlogs)
router.get('/:id', getBlog)
router.put('/:id', updateBlog)
router.delete('/:id', deleteBlog)
router.post('/post-blog', postBlog)

module.exports = router
