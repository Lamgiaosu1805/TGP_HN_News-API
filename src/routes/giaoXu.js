const express = require('express');
const GiaoXuController = require('../controllers/GiaoXuController');
const router = express.Router()

// router.get('/save', GiaoXuController.getGiaoXu);

router.post('/search', GiaoXuController.searchGiaoXu);

module.exports = router;