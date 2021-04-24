const monUser = require('../models/user');

const user_create = (req, res) => {
    const userEmail = req.body.userEmail;
    const password = req.body.password;

    const newUser = new monUser({ userEmail: userEmail, password: password });
    newUser.save()
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            res.send(error);
        })
}

const user_index = (req, res) => {
    monUser.find().sort({ createdAt: -1 })
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            res.send(error);
        })
}

const user_delete = (req, res) => {
    const id = req.params.id;

    monUser.findByIdAndDelete(id)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        })
}

module.exports = {
    user_create,
    user_index,
    user_delete
}