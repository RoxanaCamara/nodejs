const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');
const fileUpload = require('express-fileupload');

class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT || 5000
        this.path = {
            auth: '/api/auth',
            categories: '/api/categories',
            products: '/api/products',
            search: '/api/search',
            users: '/api/users',
            uploads: '/api/uploads',                        
        }

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


        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/'
          }));
    }

    routes(){
        this.app.use( this.path.auth, require( '../routes/auth'))
        this.app.use( this.path.categories, require( '../routes/categories'))
        this.app.use( this.path.products, require( '../routes/products'))
        this.app.use( this.path.search, require( '../routes/search'))
        this.app.use( this.path.users, require( '../routes/users'))
        this.app.use( this.path.uploads, require( '../routes/uploads'))
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidos Runninn in port', this.port)
        })
    }

}

module.exports = Server;
