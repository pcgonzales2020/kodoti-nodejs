const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test')
    .then(
        () => console.log('Database Mongo connect')
    )
    .catch(
        (e) => console.error('error', e)
    );

module.exports = mongoose;