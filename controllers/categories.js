const {response, request, json} = require('express');
const Categorie = require("../models/Categorie")


const postCategorie = async (req, res = response) => {

    const name = req.body.name.toUpperCase()
    const categoriaDB = await Categorie.findOne({ name })

    if(categoriaDB){
        return res.status(400).json({
            msg: `La categoria ${ categoriaDB.name }, ya existe`
        })
    }
    const data = {
        name, 
        user: req.user._id
    }

    const categoria = new Categorie(data)
    await categoria.save()
    res.status(201).json(categoria)

}

module.exports = {
    postCategorie
}