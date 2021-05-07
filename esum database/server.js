const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const verifyToken = require('./config/verifyToken');

const PORT = process.env.PORT || 3000;

// express server
const server = express();

// connect to mongodb & listen for requests
const dbURI = "mongodb+srv://testUser:1234@cluster0.4imml.mongodb.net/EsumDB?retryWrites=true&w=majority";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => server.listen(PORT))
    .catch(err => console.log(err));

// register view engine
server.set('view engine', 'ejs');

// middleware & static files
server.use(cookieParser());
server.use(bodyParser.json())
server.use(express.static('public'));
server.use(express.urlencoded({ extended: true }));
server.use(morgan('dev'));
server.use((req, res, next) => {
    res.locals.path = req.path;
    //lets us access the current user locally
    res.locals.user = req.user;
    next();
});

// routes
//for all routes render user based content
server.get('*', verifyToken.renderUser);
server.use('/email', require('./routes/emailRoutes'));
server.use('/', require('./routes/userRoutes'));
server.use('/', require('./routes/navRoutes'));
server.use('/', require('./routes/adminRoutes'));

// 404 page
server.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
console.log(`Server is running on port ${PORT}.`);