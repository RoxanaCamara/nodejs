const mongoose = require('mongoose')

const dbConnection = () => {

    try {
        mongoose.connect(process.env.MONGO_COMPAS)
        console.log('Data Base WORKING'.green)
    } catch (error) {
        console.log(error)
        throw new Error('Error al iniciar la base de datos')
        
    }
}

module.exports = {
    dbConnection
}