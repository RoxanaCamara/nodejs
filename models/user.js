const { Schema, model} = require('mongoose')

const UserSchema = Schema({
    name: {
        type:String,
        required: [true, 'The name is required']
    },
    email: {
        type:String,
        required: [true, 'The email is required'],
        unique: true
    },
    password: {
        type:String,
        required: [true, 'The password is required'],
    },
    role: {
        type:String,
        required: [true, 'The Role is required'],
        default: 'USER_CLIENT'
    },
    img: {
        type:String,
    },
    state: {
        type: Boolean,
        default: true        
    },
    google: {
        type: Boolean,
        default: false        
    }
});


UserSchema.methods.toJSON = function () {
    const { __v, password, _id, ...user} = this.toObject()
    user.uid = _id
    return user
}

module.exports = model('User', UserSchema)