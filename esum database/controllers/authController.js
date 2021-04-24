const User = require('../models/user')

var jwt = require('jsonwebtoken');
//var bcrypt = require('bcryptjs');
//key used for encrpytion
const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk';

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
	return jwt.sign({ id }, JWT_SECRET, {
		expiresIn: maxAge
	});
};

exports.login_post = async (req, res) => {
	const { userEmail, password } = req.body
	try {
		const user = await User.findOne({ userEmail }).lean()

		if (!user) {
			const errors = ('No Account With This Email Exists');
			res.status(400).json({ errors });
		};
		//replace with the following line if the passwords are encrypted
		//const validPass = await bcrypt.compare(password, user.password);
		if (password !== user.password) {
			const errors = ('Incorrect Password')
			res.status(400).json({ errors });
		};  
		const accessToken = createToken(user._id);
		res.cookie('jwt', accessToken, { maxAge: maxAge * 1000 });
		res.status(200).json({ user: user._id, token: accessToken })
	}
	catch (err) {
		const errors = 'Something Went Wrong!'
		res.status(400).json({ errors });
    }
	};

exports.register_post = async (req, res) => {

	const { userEmail, password, cpass } = req.body

	//checks to see if passwords match
	if (password != cpass) {
		return res.json({
			status: 'error',
			error: 'Passwords Do Not Match'
		});
	}

	if (password.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be at least 6 characters'
		})
	}

	//replace with this line if we are encrypting passwords
	//const password = await bcrypt.hash(plainTextPassword, 10)

	try {
		const response = await User.create({
			userEmail,
			password
		})
		console.log('User created successfully: ', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Email already has an account' })
		}
		throw error
	}

	res.json({ status: 'ok' })

};

//clears session cookies and removes jwt auth token
exports.logout = (req, res) => {
	res.cookie('jwt', '', { maxAge: 1 });
	res.redirect('/')
}