const { multiplicar } = require('./multiplicar/Multiplicar')
const { args } = require('./config/yargs')

console.clear();

const { l , b, h } = args
multiplicar(l, b, h).then(nombreDelArchivo => console.log(nombreDelArchivo, 'creado')).catch(err => console.log(err))