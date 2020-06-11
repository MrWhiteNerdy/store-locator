const express = require('express');
const router = express.Router();
const { getStores, addStore } = require('../controllers/stores');

router.route('/').get(getStores);
router.route('/').post(addStore);

module.exports = router;
