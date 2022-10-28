const path = require('path')
const { v4:uuidv4 } = require('uuid');

const extns = ['jpg', 'jpeg', 'gif', 'png']

const subirArchivo = (files, extenciones= extns, folder = '') => {
    return new Promise((resolve, reject) => { 

    const { archivo } = files;
    let extencion = archivo.name.split('.')
    extencion = extencion[extencion.length - 1]
    const nombreFile = `${uuidv4()}.${extencion}`
    
    const uploadPath = path.join(__dirname, '../uploads/', folder, nombreFile);

    if (!(extenciones.includes(extencion))) {
        return reject({ msg: `Extencion ${extencion} no valida. Debe subir un elemento del tipo ${extenciones}` });
    }

    archivo.mv(uploadPath, (err) => {
        if (err) {
           reject({ msg: err });
        }  
        resolve(nombreFile)     
    })

    })
}

module.exports={
    subirArchivo
}