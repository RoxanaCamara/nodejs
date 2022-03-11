const preguntasAppNotas = [
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


const preguntasAppClima = [ {
    type: 'list',
    name: 'opcion',
    message: '¿Que desea hacer?',
    choices: [
        {
            name: `${'1.'.green} Buscar Ciudad `,
            value: 1
        },
        {
            name: `${'2.'.green} Historial`,
            value: 2
        },
        {
            name: `${'0.'.green} Salir`,
            value: 0
        }
    ]
}]


module.exports ={ preguntasAppNotas, preguntasAppClima}