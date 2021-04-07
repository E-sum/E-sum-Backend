const express = require('express');
const emailController = require('../controllers/emailController');

const router = express.Router();

router.get('/create', emailController.email_create_get);
router.get('/', emailController.email_index);
router.post('/', emailController.email_create_post);
router.get('/:id', emailController.email_details);
router.delete('/:id', emailController.email_delete);

module.exports = router;