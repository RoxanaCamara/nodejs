const fs = require('fs')

const guardarDB = (data) =>{
    fs.writeFileSync(`./db/data.json`, JSON.stringify(data))
}

module.exports ={
    guardarDB   
}