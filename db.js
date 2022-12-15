const mongoose = require('mongoose');

const connect = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/codingchallenge',).then(() => {
        console.log('Mongodb Connected');
    })
}

connect()