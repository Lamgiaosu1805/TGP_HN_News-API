const express = require('express');
const PostController = require('../controllers/PostController');
const router = express.Router()

router.get('/newPost', PostController.getNewPost);
router.get('/newPostReceived', PostController.getNewPostReceived);
router.get('/loiChuaMoiNgay', PostController.getLoiChuaMoiNgay);
router.get('/linhMucDoan', PostController.getLinhMuc);

module.exports = router;