const monAdmin = require('../models/admin');

const admin_create = (req,res) => {
    const adminEmail = req.query.adminEmail;
    const password = req.query.password;

    const newAdmin = new monAdmin({adminEmail:adminEmail, password:password});
    newAdmin.save()
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            res.send(error);
        })
}

const admin_index = (req,res) => {
    monAdmin.find().sort({createdAt: -1})
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            res.send(error);
        })
}

const admin_delete = (req,res) => {
    const id = req.params.id;

    monAdmin.findByIdAndDelete(id)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        })
}

module.exports = {
    admin_create,
    admin_index,
    admin_delete
}