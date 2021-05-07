const jwt = require('jsonwebtoken');
const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk';
const User = require('../models/user');
const Admin = require('../models/admin');

//This Function checks to see if the user has a valid token/if they are signed in, this makes it 
//possible to protect routes for the JWT cookie based authentication
exports.verifyToken = (req, res, next) => {
	const token = req.cookies.jwt;
	if (!token) { return res.status(400).send('Must Be Logged In to Access'); };
	try {
		const verified = jwt.verify(token, JWT_SECRET);
		req.user = verified;
		req.admin = verified;
		next();
	} catch (err) { console.log('User Tried To Access A Restricted Page') }
};

//This function allows us to grab the current user object and
//render views/content that only the current user should be seeing
exports.renderUser = (req, res, next) => {
	const token = req.cookies.jwt;
	if (!token) {
		res.locals.user = ' ';
		next();
	} else {
		try {
			jwt.verify(token, JWT_SECRET, async (err, decodedToken) => {
				var user = await User.findById(decodedToken.id);
				//if not a user account then its an admin
				if (user == null) {user = await Admin.findById(decodedToken.id);}
				res.locals.user = user;
				next();
			});
		} catch (err) {
			console.log('No Token Found')
		}
	}
};