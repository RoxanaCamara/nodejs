const fs = require('fs')
const rute = `./db/data.json`

const guardarDB = (data, rute) =>{
    fs.writeFileSync(rute, JSON.stringify(data))
}

const leerDB = (rute) =>{
    if( !fs.existsSync(rute)){
        return []
    }
    const info = fs.readFileSync(rute, {encoding: 'utf-8'})
    const data = JSON.parse(info)
    return data !== null ? data : []
}

const guardarPlacesDB = (info, rute) =>{
    let data
    if( fs.existsSync(rute)){        
        const db = fs.readFileSync(rute, {encoding: 'utf-8'})
        data = JSON.parse(db)
    }
    !!data ? guardarDB([...data, info ],rute) : guardarDB( [info],rute)    
}

module.exports ={
    guardarDB,
    guardarPlacesDB,
    leerDB  
}