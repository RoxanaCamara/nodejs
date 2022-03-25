const express = require('express');
const cors = require('cors');

class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.usersPath = '/api/users';

        //Middelwares
        this.middelwares()

        //Routes in app
        this.routes()
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
        this.app.use( this.usersPath, require( '../routes/users'))
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidos Runninn in port', this.port)
        })
    }

}

module.exports = Server;