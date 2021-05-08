const express = require('express');
const emailController = require('../controllers/emailController');
const verifyToken = require('../config/verifyToken');

const router = express.Router();

//added user authentication to email routes
router.get('/create', verifyToken.verifyToken, emailController.email_create_get);
router.get('/index', verifyToken.verifyToken, emailController.email_index);
router.post('/', verifyToken.verifyToken, emailController.email_create_post);
router.get('/:id', emailController.email_details);
router.delete('/:id', emailController.email_delete);

module.exports = router;