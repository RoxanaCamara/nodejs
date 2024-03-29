const { Schema, model} = require('mongoose')

const CategorieSchema = Schema({
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
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

/*CategorieSchema.methods.toJSON = function () {
    const { __v, status, ...categorie} = this.toObject()
    const { name, role, email, _id} = categorie.user
    categorie.user = { name, role, email, uid: _id }
    return categorie
}*/

module.exports = model('Categories', CategorieSchema)