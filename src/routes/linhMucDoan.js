const express = require('express');
const LinhMucDoanController = require('../controllers/LinhMucDoanController');
const router = express.Router()

router.get('/', LinhMucDoanController.getLinhMuc);
// router.get('/updateAllInfo', LinhMucDoanController.updateLinhMucInfo);
router.get('/:page', LinhMucDoanController.getLinhMucPerPage);

router.post('/search', LinhMucDoanController.searchLinhMuc);

module.exports = router;