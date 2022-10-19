const { response, request, json } = require('express');
const { ObjectId } = require('mongodb');
const { COLECCIONES } = require('../constantes/Constantes');
const { User, Categorie, Product, Role} = require('../models/index');

const getSearch = async (req, res = response) => {
    const { collection, termino } = req.params

    if (!COLECCIONES.includes(collection)) {
        return res.status(404).json({ msg: `La coleccion ${collection} no existe, las opciones validas son ${COLECCIONES}` })
    }
    switch (collection) {
        case 'user':
            searchUsers(termino, res)
            break;
        case 'categorie':
            searchCategories(termino, res)
            break;
        case 'product':
            searchProducts(termino, res)
            break; 
        case 'rol':
            searchRoles(termino, res)
            break; 
        default:
            res.status(404).json('Algo sucedio');
            break;
    }

}

const searchUsers = async (termino, res = response) => {
    const isMongoID = ObjectId.isValid(termino);
    if(isMongoID){
        const user = await User.findById(termino)
        return res.json({ results: !user ? [] : [ user ] })
    }

    const regex = new RegExp( termino, 'i')
    const users = await User.find({  
        $or: [ 
            { name: regex}, 
            { email: regex}
        ], 
        $and: [
            {state: true}
        ]})
    res.json({ results: !users ? [] : [ users ] })    
}

const searchCategories = async (termino, res = response) => {
    const isMongoID = ObjectId.isValid(termino);
    if(isMongoID){
        const categorie = await Categorie.findById(termino)
        return res.json({ results: !categorie ? [] : [ categorie ] })
    }

    const regex = new RegExp( termino, 'i')
    const categories = await User.find({  
        $or: [ 
            { name: regex}
        ], 
        $and: [
            {status: true}
        ]})
    res.json({ results: !categories ? [] : [ categories ] }) 
}

const searchProducts = async (termino, res = response) => {
    const isMongoID = ObjectId.isValid(termino);
    if(isMongoID){
        const product = await Product.findById(termino)
        return res.json({ results: !product ? [] : [ product ] })
    }

    const regex = new RegExp( termino, 'i')
    const products = await User.find({  
        $or: [ 
            { name: regex}, 
            { price: regex},
            { categorie: regex}
        ], 
        $and: [
            {stock: true},
            {status: true}
        ]})
    res.json({ results: !products ? [] : [ products ] }) 
}

const searchRoles = async (termino, res = response) => {
    const isMongoID = ObjectId.isValid(termino);
    if(isMongoID){
        const rol = await rol.findById(termino)
        return res.json({ results: !rol ? [] : [ user ] })
    }

    const regex = new RegExp( termino, 'i')
    const roles = await User.find({  
        $or: [ 
            { role: regex}, 
        ]})
    res.json({ results: !roles ? [] : [ roles ] }) 
}


module.exports = {
    getSearch
}