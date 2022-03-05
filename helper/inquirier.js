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

module.exports = {
    inquirerMenu, pause, leerInput
}
