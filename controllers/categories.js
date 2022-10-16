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

const getCategories = async (req, res = response) => {
    const { limit = 5, from= 0 } = req.query
    const query = {status: true}
    const [total, categories] = await Promise.all([
        Categorie.find(query).populate('user').skip(Number(from)).limit(Number(limit)),
        Categorie.countDocuments(query)])

    res.json({categories, total});    
}

const getCategorie = async (req, res = response) => {
    const name  = req.params.name.toUpperCase()
    let categorie = await Categorie.findOne({name}).populate('user')
    if(!categorie){
        return res.status(404).json({ msg: `La categoria ${categorie} buscada no existe`})
    }
    res.json(categorie);    
}

const putCategorie = async (req, res = response) => {
    const name = req.params.name.toUpperCase()
    const newName = req.body.newName.toUpperCase()
    const categorie = await Categorie.findOneAndUpdate({name}, {name: newName}, {new: true})
    res.json({ categorie, oldName: name })
}

const deleteCategorie = async (req, res = response) => {
    const name = req.params.name.toUpperCase()
    const categorie = await Categorie.findOneAndUpdate({name}, {status: false}, {new: true})
    res.json(categorie)
}

module.exports = {
    postCategorie, getCategories, getCategorie, putCategorie, deleteCategorie
}