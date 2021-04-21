const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();

router.post('/admin', adminController.admin_create);

router.get('/admin', adminController.admin_index);

router.delete('/admin/:id', adminController.admin_delete);

module.exports = router;