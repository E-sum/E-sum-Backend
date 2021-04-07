const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const emailRoutes = require('./routes/emailRoutes');
const userRoutes = require('./routes/userRoutes');

// express server
const server = express();

// connect to mongodb & listen for requests
const dbURI = "mongodb+srv://testUser:1234@cluster0.4imml.mongodb.net/EsumDB?retryWrites=true&w=majority";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => server.listen(3000))
  .catch(err => console.log(err));

// register view engine
server.set('view engine', 'ejs');

// middleware & static files
server.use(express.static('public'));
server.use(express.urlencoded({ extended: true }));
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
server.get('/', (req, res) => {
  res.redirect('/email');
});

server.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

server.get('/FAQ', (req, res) => {
  res.render('FAQ', { title: 'FAQ' });
});

// email routes
server.use('/email', emailRoutes);

//user routes
server.use(userRoutes);

// 404 page
server.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});