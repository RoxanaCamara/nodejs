### Start Proyect
nodemon run dev

###
Recordatorio en .env.MONGO_COMPAS se encuentra la url de la db

## Usar posman
1- Login usuario, obtenemos el token
2- en el request que necesitemos correr reemplazamos el valor de x-token por el que nos vino en el login

###
HEROKU DESPLIEGUE PRUEBAS
1 - "start": "node server.js"
2 - "start": "node app"
3 - this.port = process.env.PORT || 5000
4 - "start": "node app.js"
5 - Comente todo lo relacionado a el puerto y la db
6 - "start": "npm run build && node server.js"
7 - "start": "npm run build && node app.js"
8 - "postinstall": "npm run build",  "start": "node server.js"
    salio error de que no hay una version de node especificada
9 - Agrego esto
    "engines": {
    "node": "14.17.0",
    "npm": "6.14.13"
},

10 -   PORT = 5000 en Heroku &   "start": "node index.js" &  "engines": { "node": "14.16.1"}

https://dev.to/lawrence_eagles/causes-of-heroku-h10-app-crashed-error-and-how-to-solve-them-3jnl

https://devcenter.heroku.com/articles/error-codes#h10-app-crashed

#### Lo que hay que hacer
1- despues verificar todos los gets de postman del search
2- 

