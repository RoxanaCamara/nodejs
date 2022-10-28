
const { subirArchivo } = require('../helper/subir-archivo');

const loadFiles = async(req, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({ msg: 'No files were uploaded.'});
        return;
    }
    if (!req.files.archivo) {
        res.status(400).json({ msg: 'No files were uploaded.'});
        return;
    }

    try {
        const nombre = await subirArchivo(req.files, ['xlsx'], 'excel')    
        res.json({ msg: 'File uploaded to ' + nombre });
    } catch (msg) {
        res.status(400).json(msg)
    }
}

module.exports = {
    loadFiles
}