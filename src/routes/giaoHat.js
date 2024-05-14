const express = require('express');
const GiaoHatController = require('../controllers/GiaoHatController');
const router = express.Router()

// router.get('/save', GiaoHatController.saveGiaoHat);
router.get('/show', GiaoHatController.getListGiaoHat);

module.exports = router;