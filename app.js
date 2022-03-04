const { multiplicar } = require('./multiplicar/Multiplicar')
console.clear();

multiplicar(num).then(nombreDelArchivo => console.log(nombreDelArchivo, 'creado')).catch(err => console.log(err))