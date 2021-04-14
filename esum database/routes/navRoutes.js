const express = require('express');
const router = express.Router();
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

module.exports = router;