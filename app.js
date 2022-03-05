//const { args } = require('./config/yargs');
//const { multiplicar } = require('./multiplicar/Multiplicar')
//console.clear();
//const { l , b, h } = args
//multiplicar(l, b, h).then(nombreDelArchivo => console.log(nombreDelArchivo, 'creado')).catch(err => console.log(err))


const { inquirerMenu, pause, leerInput } = require('./helper/inquirier');
const Tareas = require('./models/Tareas');
const { guardarDB } = require('./helper/guardarArchivos');

//App consola
const main = async () => {
    const tareas = new Tareas()
    let opt =''

    do {
        opt = await inquirerMenu();
        
        switch (opt) {
            case 1:
                const desc = await leerInput('Descripcion')
                tareas.crearTarea(desc)
                break;
            case 2:
                console.log(tareas.listadoArr)
            break;
        
            default:
                break;
        }
        guardarDB(tareas.listadoArr)
        await pause();
       
        
        
    } while (opt !== 0);
}

main()