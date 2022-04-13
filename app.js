//const { args } = require('./config/yargs');
//const { multiplicar } = require('./multiplicar/Multiplicar')
//console.clear();
//const { l , b, h } = args
//multiplicar(l, b, h).then(nombreDelArchivo => console.log(nombreDelArchivo, 'creado')).catch(err => console.log(err))

require('dotenv').config()

const { inquirerMenu, pause, leerInput, menuBorrar, confirmar, mostrarTareasChecklist, listar, showPlace } = require('./helper/inquirier');
const Tareas = require('./models/Tareas');
const Busquedas = require('./models/Busquedas');

const { guardarDB, leerDB, guardarPlacesDB } = require('./helper/guardarArchivos');
const { preguntasAppNotas, preguntasAppClima } = require('./constantes/Constantes');

//Apps en consola

const mainTasksApp = async () => {
    const tareas = new Tareas()
    const tareasDB = leerDB(`./db/data.json`)
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
        guardarDB(tareas.listadoArr, `./db/data.json`)
        if(opt !== 0) await pause();        
    } while (opt !== 0);
}

const mainClimaApp = async () => {

    const search = new Busquedas();
    do {
        opt = await inquirerMenu(preguntasAppClima);
        switch (opt) {
            case 1:
                const namePlace = await leerInput('Ciudad: ')               
                const findPlace = await search.ciudad(namePlace)   
                const idPlace = await listar(findPlace, '¿Que pais le interesa saber?', 'Seleccione un pais')                
                const lugarSelec = findPlace.find( l => l.id == idPlace) 
                const findTemp = await search.clima(lugarSelec)
                const compleDataPlace = {...lugarSelec,  ...findTemp}    
                showPlace(compleDataPlace )  
                guardarPlacesDB( lugarSelec , `./db/database.json`)                
                break;
            case 2:  
                const ciudadesDB = leerDB(`./db/database.json`)
                if(ciudadesDB.length > 0){                       
                    const idPlace = await listar(ciudadesDB, '¿Que pais le interesa saber?', 'Seleccione un pais')                
                    const lugarSelec = ciudadesDB.find( l => l.id == idPlace) 
                    const findTemp = await search.clima(lugarSelec)
                    const compleDataPlace = {...lugarSelec,  ...findTemp}    
                    showPlace(compleDataPlace)                    
                }else{
                    console.log('No hay historial'.red)
                }
                break;
            default:
                break;
        }

        if(opt !== 0) await pause();
    } while (opt !== 0);
}

///REST Api
//const Server = require('./models/server');
//const server = new Server();
//server.listen();

mainClimaApp()