//const { args } = require('./config/yargs');
//const { multiplicar } = require('./multiplicar/Multiplicar')
//console.clear();
//const { l , b, h } = args
//multiplicar(l, b, h).then(nombreDelArchivo => console.log(nombreDelArchivo, 'creado')).catch(err => console.log(err))

require('dotenv').config()

const { inquirerMenu, pause, leerInput, menuBorrar, confirmar, mostrarTareasChecklist } = require('./helper/inquirier');
const Tareas = require('./models/Tareas');
const Busquedas = require('./models/Busquedas');

const { guardarDB, leerDB } = require('./helper/guardarArchivos');
const { preguntasAppNotas, preguntasAppClima } = require('./constantes/Constantes');

//App consola

const mainTasks = async () => {
    const tareas = new Tareas()
    const tareasDB = leerDB()
    if(tareasDB){
        tareas.cargarTareasFromArray(tareasDB)        
    }
    let opt =''
    do {
        opt = await inquirerMenu();
        
        switch (opt) {
            case 1:
                const desc = await leerInput('Descripcion')                
                tareas.crearTarea(desc)
                break;
            case 2:
               tareas.listadoCompleto()
                break;
            case 3:
               tareas.listarSegunEstado(true)
                break;
            case 4:
               tareas.listarSegunEstado(false)
                break;
            case 5:
                const ids = await mostrarTareasChecklist(tareas.listadoArr)  
                if(ids.length > 0){
                    tareas.toggleCompletas(ids)
                }              
                              
                break;
            case 6:
                const id = await menuBorrar(tareas.listadoArr)    
                if(id !== 0){
                    const ok = await confirmar(id)
                    if(ok){
                        tareas.borrarTarea(id)
                        console.log(`Tarea borrada correctamente\n`.green)
                    }
                }            
                break;        
            default:
                break;
        }
        guardarDB(tareas.listadoArr)
        if(opt !== 0) await pause();        
    } while (opt !== 0);
}

const main = async () => {

    const search = new Busquedas();

    do {
        opt = await inquirerMenu(preguntasAppClima);
        switch (opt) {
            case 1:
                const lugar = await leerInput('Ciudad: ')               
                const find = await search.ciudad(lugar) 
                console.log(find) 
                          
                console.log('\n Informacion de la ciudad\n'.green)
                console.log('Ciudad')
                console.log('Lat')
                console.log('Lng')
                console.log('Temperatura')
                console.log('Minima')
                console.log('Maxima')
                break;
        
            default:
                break;
        }

        if(opt !== 0) await pause();
    } while (opt !== 0);
}

main()
/*Por ahora vamos a comentar lo que seria la app de tareas, 
cuando terminemos la otra app vamos a unificarlos*/
