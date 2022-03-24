const inquirer = require('inquirer');
require('colors');

const inquirerMenu = async (preguntas) => {    
    console.log('==========================='.green)
    console.log('   Seleccione una opcion   '.green)
    console.log('==========================='.green)
    const { opcion } = await inquirer.prompt(preguntas);
    return opcion
}

const pause = async () => {
    const question = {
        type:  'input',
        name: 'enter',
        message: `Presione ${ `ENTER`.green  } para continuar\n`
    }
    console.log(`\n`)
    await inquirer.prompt(question)
}

const leerInput = async (msg) => {
    const question = [
        {
            type:  'input',
            name: 'desc',
            message: msg,
            validate (value) {
                if(value.length === 0){
                    return ' Ingrese un texto'
                }
                return true
            }
        }
    ]        
    const { desc } = await inquirer.prompt(question)
    return desc
}
   
const menuBorrar = async (tareas) => {
    if(tareas.length === 0 ){
        console.log(`No hay tareas que borrar.`.yellow)
        return 0
    }
    
    let choices = tareas.map( (t, i) => {
        let indice = `${i+1}.`.green
        return  {
            name: `${indice} ${t.desc} `,
            value: t.id
        }
    })

    choices.push({name: `${'0.'.green} Cancelar`,value: 0})

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: '¿Que tarea desea borrar?',
            choices: choices
        }
    ]
    
    console.log('==========================='.green)
    console.log('   Seleccione una tarea   '.green)
    console.log('==========================='.green)
    const { id } = await inquirer.prompt(preguntas);
    return id
}

const listar = async (listar, message, title) => {
    if(listar.length === 0 ){
        console.log(`No hay informacion.`.yellow)
        return 0
    }
    
    let choices = listar.map( (t, i) => {
        let indice = `${i+1}.`.green
        return  {
            name: `${indice} ${t.desc} `,
            value: t.id
        }
    })

    choices.push({name: `${'0.'.green} Cancelar`,value: 0})

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: message,
            choices: choices
        }
    ]
    
    console.log('==========================='.green)
    console.log(`       ${title}        `.green)
    console.log('==========================='.green)
    const { id } = await inquirer.prompt(preguntas);
    return id
}

const showPlace = async (place) =>{
    console.clear()
    console.log('\n Informacion de la ciudad\n'.green)
    console.log('Ciudad: '.yellow  + place.desc)
    console.log('Lat: '.yellow  + place.lat)
    console.log('Lon: '.yellow  + place.lon)
    console.log('Temperatura: '.yellow   + place.temp)
    console.log('Minima: '.yellow  + place.temMin)
    console.log('Maxima: '.yellow + place.temMax)
    console.log('Descripcion: '.yellow   + place.descClima)
}

const confirmar = async (msg) =>{
    const question = [
        {
            type:  'confirm',
            name: 'ok',
            message: msg,
        }
    ]        
    const { ok } = await inquirer.prompt(question)
    return ok

}

const mostrarTareasChecklist = async (tareas) => {
    if(tareas.length === 0 ){
        console.log(`No hay tareas.`)
        return 
    }
    
    let choices = tareas.map( (t, i) => {
        let indice = `${i+1}.`.green
        return  {
            name: `${indice} ${t.desc} `,
            value: t.id,
            checked: !!t.completadoEn
        }
    })

    

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices: choices
        }
    ]
    
    console.log('==========================='.green)
    console.log('   Seleccione una/s tarea/s   '.green)
    console.log('==========================='.green)
    const { ids } = await inquirer.prompt(preguntas);
    return ids

}

module.exports = {
    inquirerMenu, pause, leerInput, menuBorrar, confirmar, mostrarTareasChecklist, listar, showPlace
}
