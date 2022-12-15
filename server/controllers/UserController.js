const User = require('../models/User')
const Selector = require('../models/Selector')


//store in the User
const store = (req, res) => {
    const userDetails = req.body
    const user = new User(userDetails)
    console.log(user)
    User.findOne({ 'unique_id': req.body.unique_id })
        .then(function (doc) {
            console.log(doc)
            if (!doc) {
                console.log('document not found')
                user.save()
                    .then(response => {
                        res.send({ data: response })
                    })
                    .catch(err => {
                        res.send(err)
                    })
            } else {
                console.log('document found')
                console.log(doc.id)
                User.findByIdAndUpdate(doc.id, { $set: req.body })
                    .then(response => {
                        res.send(response)
                    })
                    .catch(err => {
                        res.send(err)
                    })
            }

        });
}

//udpate the User
const update = (req, res) => {
    const userID = req.body.userID ? req.body.userID : res.send({ data: 'UserID required' })

    const userDetails = req.body
    User.findByIdAndUpdate(userID, { $set: userDetails })
        .then(response => {
            res.send(response)
        })
        .catch(err => {
            res.send(err)
        })
}

//list selector 
const listSelector = (req, res) => {
    Selector.find()
        .then(response => {
            res.send({ data: response })
        })
        .catch(err => {
            res.send(err)
        })
}

//list the user
const index = (req, res) => {
    User.find()
        .then(response => {
            res.send({ data: response })
        })
        .catch(err => {
            res.send(err)
        })
}


module.exports = {
    store,
    update,
    listSelector,
    index
}