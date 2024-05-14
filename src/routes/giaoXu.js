const express = require('express');
const GiaoXuController = require('../controllers/GiaoXuController');
const router = express.Router()

router.get('/save', GiaoXuController.getGiaoXu);

module.exports = router;