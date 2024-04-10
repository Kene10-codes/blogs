const express = require('express')
const {
    getBlog,
    updateBlog,
    getBlogs,
    deleteBlog,
    postBlog,
} = require('../controllers/blog')
const auth = require('../middewares/jwt/auth')
const validateObjectId = require('../middewares/objectId/validateObjectId')
const router = express.Router()

router.get('/', getBlogs)
router.get('/:id', getBlog)
router.put('/:id', auth, updateBlog)
router.delete('/:id', [auth, validateObjectId], deleteBlog)
router.post('/post-blog', auth, postBlog)

module.exports = router
