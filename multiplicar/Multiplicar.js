const fs = require('fs')

const multiplicar = async(l, num = 0, h) => {

    try {
        let salida = '';
        for (let i = 1; i < h+1; i++) {
            salida += `${num} X ${i} = ${num * i}\n`
        }
        if(l){
            console.log(salida)
        }        
        await fs.writeFileSync(`./salida/tablaDel${num}.txt`, salida) 
        return `tabla del ${num} creado correctamente`          
    } catch (error) {
        throw error        
    }
}

module.exports ={
    multiplicar
}