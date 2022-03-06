//const { args } = require('./config/yargs');
//const { multiplicar } = require('./multiplicar/Multiplicar')
//console.clear();
//const { l , b, h } = args
//multiplicar(l, b, h).then(nombreDelArchivo => console.log(nombreDelArchivo, 'creado')).catch(err => console.log(err))


const { inquirerMenu, pause, leerInput, menuBorrar, confirmar, mostrarTareasChecklist } = require('./helper/inquirier');
const Tareas = require('./models/Tareas');
const { guardarDB, leerDB } = require('./helper/guardarArchivos');

//App consola
const main = async () => {
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
        await pause();
       
        
        
    } while (opt !== 0);
}

main()