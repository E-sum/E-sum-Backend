const jwt = require('jsonwebtoken');
const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk';

module.exports = function (req, res, next) {
	const token = req.cookies.jwt;
	if (!token) return res.status(401).send('Must Be Logged In to Access');
	try {
		const verified = jwt.verify(token, JWT_SECRET);
		req.user = verified;
		next();
	}catch (err) {
		res.status(400).send('Invalid Token')
	}
}