const jwt = require('jsonwebtoken')

const generarJWT = (uid) => {
    const payload = {uid}
    return jwt.sign(payload, process.env.SECRETKEY, {expiresIn: '4h'}, )
}

module.exports = {
    generarJWT
}