const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config')

class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT || 5000
        this.authPath = '/api/auth'
        this.usersPath = '/api/users';

        //DB
        this.conectDB()

        //Middelwares
        this.middelwares()

        //Routes in app
        this.routes()
    }

    conectDB() {
        dbConnection()
    } 

    middelwares(){
        //CORS
        this.app.use( cors()) ;

        //Read and parse the body
        this.app.use(express.json())

        //public path
        this.app.use( express.static('public'));
    }

    routes(){
        this.app.use( this.authPath, require( '../routes/auth'))
        this.app.use( this.usersPath, require( '../routes/users'))
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidos Runninn in port'.blue, this.port)
        })
    }

}

module.exports = Server;
