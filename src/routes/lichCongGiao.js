const express = require('express');
const LichCongGiaoController = require('../controllers/LichCongGiaoController');
const router = express.Router()

router.get('/', LichCongGiaoController.getLich);

module.exports = router;