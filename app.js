const { multiplicar } = require('./multiplicar/Multiplicar')
const args = require('yargs').options({
    'b': { alias: 'base', type: 'number', demandOption:true },
    'l': { alias: 'listar', type: 'boolean', demandOption:false }
    }).check((argv, options) => {
        const filePaths = argv._
        if ( isNaN(argv.b)) {
          throw new Error(" Base debe ser un numero")
        } else {
          return true
        }
      }).argv


console.clear();

const { l , b } = args
multiplicar(l, b).then(nombreDelArchivo => console.log(nombreDelArchivo, 'creado')).catch(err => console.log(err))