const {response, request, json} = require('express');
const Product = require("../models/Product")


const productPost = async (req, res = response) => {
    const { name, price, description, categorie } = req.body
    const productDB = await Product.findOne({ name }).populate('user', 'categorie')

    if(productDB){
        return res.status(400).json({
            msg: `El producto ${ name }, ya existe`
        })
    }
    const data = {
        name, 
        price, 
        description,
        user: req.user._id,
        categorie: categorie
    }

    const product = new Product(data)
    await product.save()
    res.json(product)

}

const productsGet = async (req, res = response) => {
    const { limit = 5, from= 0 } = req.query
    const query = {status: true}
    const [total, products] = await Promise.all([
        Product.find(query).populate('user','categorie').skip(Number(from)).limit(Number(limit)),
        Product.countDocuments(query)])
    res.json({products, total});    
}

const productGet = async (req, res = response) => {
    const { id }  = req.params
    let product = await Product.findById(id).populate('user','categorie')
    if(!product){
        return res.status(404).json({ msg: `El producto buscado no existe`})
    }
    res.json(product);    
}

const productPut = async (req, res = response) => {
    const { id } = req.params
    const { name, price, description } = req.body
    const product = await Product.findByIdAndUpdate(id, {name, price, description}, {new: true}).populate('user','categorie')
    if(!product){
        return res.status(404).json({ msg: `El producto buscado no existe`})
    }
    res.json({ product, oldName: name })
}

const productDelete = async (req, res = response) => {
    const { id } = req.params
    const product = await Product.findByIdAndUpdate(id, {status: false}, {new: true}).populate('user', 'categorie')
    if(!product){
        return res.status(404).json({ msg: `El producto buscado no existe`})
    }
    res.json(product)
}

module.exports = {
    productPost, productsGet, productPut, productDelete, productGet
}