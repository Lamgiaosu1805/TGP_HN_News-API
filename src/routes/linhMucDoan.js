const express = require('express');
const LinhMucDoanController = require('../controllers/LinhMucDoanController');
const router = express.Router()

router.get('/', LinhMucDoanController.getLinhMuc);
// router.get('/updateAllInfo', LinhMucDoanController.updateLinhMucInfo);

module.exports = router;