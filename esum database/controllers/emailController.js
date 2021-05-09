const email = require('../models/email');
var isAdmin = false;

const email_index = (req, res) => {
    if (res.locals.user.userEmail == undefined) {
        console.log('=> is admin: true');
        isAdmin = true;
    } else {
        console.log('=> is admin: false');
        isAdmin = false;
    }
    email.find().sort({ createdAt: -1 })
        .then(result => {
            //if not an admin load the user display
            if (isAdmin == false) {
                console.log('. . .loading user display. . .')
                res.render('userDisplay', { adminEmail: req.user.adminEmail, userEmail: req.user.userEmail, email: result, title: 'All emails' });
            }
            if (isAdmin == true){
                console.log('. . .loading admin display. . .');
                res.render('adminDisplay', { adminEmail: req.user.adminEmail, userEmail: req.user.userEmail, email: result, title: 'All emails' })
            }
        })
        .catch(err => { console.log(err);  });
}

const email_details = (req, res) => {
  const id = req.params.id;
  email.findById(id)
    .then(result => {
      res.render('details', { email: result, title: 'email Details' });
    })
    .catch(err => {
      console.log(err);
      res.render('404', { title: 'email not found' });
    });
}

const email_create_get = (req, res) => {
  res.render('create', { title: 'Create a new email' });
}

var i = 0;
const email_create_post = (req, res) => {
  const newEmail = new email(req.body);
  newEmail.save()
      .then(result => {
          i = 1;
          res.render('./nav/adminLogin', { title: 'Admin Login' });
    })
    .catch(err => {
      console.log(err);
    });
}
if (i = 1) { isAdmin = true; }

const email_delete = (req, res) => {
    const id = req.params.id;
    if (isAdmin == true) {
        email.findByIdAndDelete(id)
            .then(result => {
                res.json({ redirect: '/email/index' });
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        const errors = 'You Must Be An Admin to Delete Email Threads'
        console.log(errors)
    };
}

module.exports = {
  email_index, 
  email_details, 
  email_create_get, 
  email_create_post, 
  email_delete
}