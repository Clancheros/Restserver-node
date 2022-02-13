const mongoose = require('mongoose');

const dbConection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN);

        console.log('Conexión a la base de datos');
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    dbConection
}