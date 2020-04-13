const { db } = require('./admin');

exports.getAllUsers = (req, res) => {
    const users = [];
    db.collection('users').get()
    .then(pre => {
        pre.forEach(el => {
            users.push(el.data())
        });
        return res.status(200).send(users);
    })
    .catch(err => {
        return res.status(500).send(err);
    })
}

exports.addNewUser = (req, res) => {
    const checkEmail = [], checkPhone = [];
    db.collection('users').where('email', '==', req.body.email).get()
    .then(pre => {
        pre.forEach(el => {
            checkEmail.push(el.data())
        })
        return db.collection('users').where('phone', '==', req.body.phone).get()
    })
    .then(pre => {
        pre.forEach(el => {
            checkPhone.push(el.data())
        })
        return true;
    })
    .then(() => {
        if (checkEmail.length > 0 || checkPhone.length > 0) {
            if (checkEmail.length > 0) {
                return res.status(211).send({ code: 211, status: 'email already used, try another!' })
            } else {
                return res.status(212).send({ code: 212, status: 'phone number already used, try another!' })
            }
        } else {
            return db.collection('users').add(req.body)
        }
    })
    .then(() => {
        return res.status(200).send({code: 200, status: 'new user has been added!'})
    })
    .catch(err => {
        res.status(500).send({ code: 500, status: 'error: ' + err })
    })
}