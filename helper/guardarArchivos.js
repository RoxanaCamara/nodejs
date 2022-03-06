const fs = require('fs')
const rute = `./db/data.json`

const guardarDB = (data) =>{
    fs.writeFileSync(rute, JSON.stringify(data))
}

const leerDB = () =>{
    if( !fs.existsSync(rute)){
        return null
    }
    const info = fs.readFileSync(rute, {encoding: 'utf-8'})
    const data = JSON.parse(info)
    return data
}

module.exports ={
    guardarDB,
    leerDB  
}