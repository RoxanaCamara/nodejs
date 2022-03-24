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
    if( !fs.existsSync(rute)){
        return null
    }
    const db = fs.readFileSync(rute, {encoding: 'utf-8'})
    const data = JSON.parse(db)
    let nn
    if(data !== null){
        nn = [...data, info ]
    }else{
        nn = [info ]
    }
    fs.writeFileSync(rute, JSON.stringify(nn))
}

module.exports ={
    guardarDB,
    guardarPlacesDB,
    leerDB  
}