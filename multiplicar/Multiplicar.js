const fs = require('fs')

const multiplicar = async(l = false, num = 0) => {

    try {
        let salida = '';
        for (let i = 0; i < 11; i++) {
            salida += `${num} X ${i} = ${num * i}\n`
        }
        if(l){
            console.log(salida)
        }        
        await fs.writeFileSync(`tablaDel${num}.txt`, salida) 
        return `tabla del ${num} creado correctamente`          
    } catch (error) {
        throw error        
    }
}

module.exports ={
    multiplicar
}