const inquirer = require('inquirer');
require('colors');

const inquirerMenu = async () => {
    const preguntas = [
        {
            type: 'list',
            name: 'opcion',
            message: '¿Que desea hacer?',
            choices: [
                {
                    name: `${'1.'.green} Crear Tarea`,
                    value: 1
                },
                {
                    name: `${'2.'.green} Listar Tareas`,
                    value: 2
                },
                {
                    name: `${'3.'.green} Listar Tareas completadas`,
                    value: 3
                },
                {
                    name: `${'4.'.green} Listar Tareas pendientes`,
                    value: 4
                },
                {
                    name: `${'5.'.green} Completar Tarea(s)`,
                    value: 5
                },
                {
                    name: `${'6.'.green} Borrar Tarea`,
                    value: 6
                },
                {
                    name: `${'0.'.green} Salir`,
                    value: 0
                }
            ]
        }
    ]
    
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
        console.log(`No hay tareas.`.yellow)
        return 0
    }
    
    let choices = tareas.map( (t, i) => {
        let indice = `${i+1}.`.green
        return  {
            name: `${indice} ${t.desc} `,
            value: t.id,
            checked: !!t.completadoEn
        }
    })

    choices.push({name: `${'0.'.green} Cancelar`,value: 0})

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
    inquirerMenu, pause, leerInput, menuBorrar, confirmar, mostrarTareasChecklist
}
