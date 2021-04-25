const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');
const verifyToken = require('../config/verifyToken');

//protected route (user-authetication required)
router.get('/dashboard', verifyToken, (req, res) => {
	res.render('../views/dashboard')
});

// routes
router.all('/', (req, res) => {
	res.render('../views/nav/home');
});

router.get('/about', (req, res) => {
	res.render('../views/nav/about', { title: 'About' });
});

router.get('/FAQ', (req, res) => {
	res.render('../views/nav/FAQ', { title: 'FAQ' });
});

router.get('/home', (req, res) => {
	res.render('../views/nav/home', { title: 'Home' });
});

//log routes
router.get('/login', (_req, res) => {
	res.render('./nav/login', { title: 'Login' });
});
router.get('/register', (req, res) => {
	res.render('./nav/register', { title: 'Register' });
});
router.get('/change-password', (req, res) => {
	res.render('./nav/change-password', { title: 'Change Password' });
});

router.get('/logout', controller.logout);

//post functionality for login
router.post('/login', controller.login_post);
router.post('/login', controller.login_admin);

//post functionality for creating an account
router.post('/register', controller.register_post);


module.exports = router;