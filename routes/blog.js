const express = require('express')
const {
    getBlog,
    updateBlog,
    getBlogs,
    deleteBlog,
    postBlog,
} = require('../controllers/blog')
const auth = require('../middewares/jwt/auth')
const authAdmin = require('../middewares/auth/admin')
const validateObjectId = require('../middewares/objectId/validateObjectId')
const router = express.Router()

router.get('/', getBlogs)
router.get('/:id', getBlog)
router.put('/:id', [auth, authAdmin], updateBlog)
router.post('/post-blog', [auth, authAdmin], postBlog)
router.delete('/:id', [auth, validateObjectId, authAdmin], deleteBlog)

module.exports = router
