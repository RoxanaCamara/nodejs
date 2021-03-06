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
        unique: true
    },
    role: {
        type:String,
        required: [true, 'The Role is required'],
    },
    uid: {
        type:String,
        required: [true, 'The UID is required'],
        unique: true
    },

    /*
    
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
    }*/
});


UserSchema.methods.toJSON = function () {
    const { __v, password, ...user} = this.toObject()
    return user
}

module.exports = model('User', UserSchema)