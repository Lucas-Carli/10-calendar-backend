const mongoose = require('mongoose');

const dbConnection = async () => {

    try {

        // mongoose.connect('mongodb://127.0.0.1:27017/test');
        await mongoose.connect(process.env.DB_CNN, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        });

        console.log('DB Online');

    } catch (error) {
        console.log(error);
        throw new Error('Error inicializing database')
    }
}

module.exports = {
    dbConnection
}