const { Schema, model} = require('mongoose')

const ProductSchema = Schema({
    name:{
        type:String,
        required: [true, 'Name is required'],
        unique: true
    },
    status:{
        type: Boolean,
        default: true,
        required: true 
    },
    price: {
        type: Number,
        default: 0
    },
    description: {
        type: String
    },
    stock: {
        type: Boolean,
        default: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    categorie:{
        type: Schema.Types.ObjectId,
        ref: 'Categorie',
        required: true
    },
    img: {
        type: String
    }
})

/**ProductSchema.methods.toJSON = function () {
    const { __v, status, ...product} = this.toObject()
    const { name, role, email, _id} = product.user
    product.user = { name, role, email, uid: _id }
    return product
} */

module.exports = model('Products', ProductSchema)