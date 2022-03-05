
const args = require('yargs').options({
    'b': { alias: 'base', type: 'number', demandOption:true, describe: 'base es el mulltiplicador de la tabla' },
    'l': { alias: 'listar', type: 'boolean', default: false,  describe: 'listar nos da la opcion de mostrar en consola la tabla' },
    'h': { alias: 'hasta', type: 'number', default: 10,  describe: ' hasta nos limita hasta que numero multiplicamos' }
    }).check((argv, options) => {
        const filePaths = argv._
        if ( isNaN(argv.b) ) {
          throw new Error(" Base debe ser un numero")
        } else {
          return true
        }
      }).argv


//module.exports ={ args }