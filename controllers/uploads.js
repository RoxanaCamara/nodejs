
const { subirArchivo } = require('../helper/subir-archivo');
const Product = require('../models/Product');
const User = require('../models/User');

const fs = require('fs');
const path = require('path');


const loadFiles = async(req, res = response) => {
    try {
        const nombre = await subirArchivo(req.files, ['jpg', 'png'], 'uploads')    
        res.json({ msg: 'File uploaded to ' + nombre });
    } catch (msg) {
        res.status(400).json(msg)
    }
}

const updateImage = async (req, res = response) => {
    const { id, collection } = req.params;
    let model;
    switch (collection) {
        case 'users':
            model = await User.findById(id)
            if(!model){
                res.status(400).json({ msg: `No existe un usuario con el id ${id}`})
            }
            break;    
        case 'products':
            model = await Product.findById(id)
            if(!model){
                res.status(400).json({ msg: `No existe un producto con el id ${id}`})
            } 
            
        break;
        default: 
            res.status(400).json({ msg: `No existe ninguna coleccion con el id ${id}`})
            break;
    }

    if(model.img){
        const pathImg = path.join(__dirname, '../uploads', collection, model.img )
        if(fs.existsSync(pathImg)){
            fs.unlinkSync(pathImg)
        }
    }

    try {
        const nombre = await subirArchivo(req.files, undefined, collection) 
        model.img = nombre
        await model.save()
        res.json(model)        
    } catch (msg) {
        res.status(400).json(msg)
    }

    
}

const showImage = async (req, res = response) => {
    const { id, collection } = req.params;
    let model;
    switch (collection) {
        case 'users':
            model = await User.findById(id)
            if(!model){
                res.status(400).json({ msg: `No existe un usuario con el id ${id}`})
            }
            break;    
        case 'products':
            model = await Product.findById(id)
            if(!model){
                res.status(400).json({ msg: `No existe un producto con el id ${id}`})
            } 
            
        break;
        default: 
            res.status(400).json({ msg: `No existe ninguna coleccion con el id ${id}`})
            break;
    }

    if(model.img){
        const pathImg = path.join(__dirname, '../uploads', collection, model.img )
        if(fs.existsSync(pathImg)){
            return res.sendFile(pathImg)
        }        
    }

    let notFoundImg = path.join(__dirname, '../assets', 'no-image.jpg' )
    if(fs.existsSync(notFoundImg)){
        return res.sendFile(notFoundImg)
    }
    res.status(400).json({ msg: `No existe ninguna imagen`})
}

module.exports = {
    loadFiles, updateImage, showImage
}