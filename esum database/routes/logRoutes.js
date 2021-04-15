const User = require('../models/user')
const express = require('express');
const server = express.Router();
const jwt = require('jsonwebtoken')

//const bcrypt = require('bcryptjs')
//key used for encrpytion
const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk';

//log get routes
server.get('/login', (_req, res) => {
	res.render('./log/login', { title: 'Login' });
});
server.get('/register', (req, res) => {
	res.render('./log/register', { title: 'Register' });
});
server.get('/change-password', (req, res) => {
	res.render('./log/change-password', { title: 'Change Password' });
});

//post functionality for login
server.post('/login', async (req, res) => {
	const { userEmail, password } = req.body
	const user = await User.findOne({ userEmail }).lean()

	if (!user) {
		return res.json({ status: 'error', error: 'No Account With This Email Exists' })
	}

	if (password == user.password) {
//replace with the following line if the passwords are encrypted
	//if (await bcrypt.compare(password, user.password)) {

// the userEmail, password combination is successful
		const token = jwt.sign(
			{
				id: user._id,
				userEmail: user.userEmail
			},
			JWT_SECRET
		)

		return res.json({ status: 'ok', data: token })
	}

	res.json({ status: 'error', error: 'Incorrect Password! Try Again' })
})

//post functionality for creating an account
server.post('/register', async (req, res) => {
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
})

module.exports = server;
