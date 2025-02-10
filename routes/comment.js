const express = require("express");
const postComment = require("../controllers/comment");
const router = express.Router();

// routes
router.post("/post-comment", postComment);

module.exports = router;
