const mongoose = require('mongoose');

const connect = () => {
    mongoose.connect('mongodb+srv://challenge:challenge@cluster0.z7wg1th.mongodb.net/?retryWrites=true&w=majority',).then(() => {
        console.log('Mongodb Connected');
    })
}

connect()