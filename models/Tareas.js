const Tarea = require("./Tarea");

class Tareas {
    _listado = {};

    constructor(){
        this._listado={}
    }

    get listadoArr () {
        const list = []
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key]
            list.push(tarea)
        })
        return list
    }

    cargarTareasFromArray = (array) => {
        array.forEach(t => this._listado[t.id]=t);
    }
    
    listarTareas = (array, text) => {
        if(array.length === 0 ){
            console.log(`${text}.`.yellow)
        }else{
            array.forEach( (t, i) => {
                let indice = `${ i+1}.`.green 
                let desc = `${t.desc}`
                let estado = this.mostrarSegunEstado(text, t)
                console.log( `${indice} ${desc} :: ${estado}`)
             })
        }        
    }

    mostrarSegunEstado = (text, t) => {
        if(t.completadoEn && text === `No hay tareas.` ){
            return `Completado`.green
        }
        if(t.completadoEn){
            return `${t.completadoEn}`.green
        }
        return `Pendiente`.red
    }

    listadoCompleto = () => {       
        this.listarTareas(this.listadoArr, `No hay tareas.`)        
    }

    listarSegunEstado = (completadas = true) => {
        let result = this.listadoArr.filter(t => completadas ? !!t.completadoEn : !t.completadoEn);
        let texto = completadas ? ` No hay tareas Completadas.` : `No hay tareas Pendientes.`
        this.listarTareas(result, texto)        
    }
   
    crearTarea = (desc) => {
        const t = new Tarea(desc);
        this._listado[t.id]=t
    }

    borrarTarea = (id) => {
        if(this._listado[id]){           
            delete this._listado[id]
        }
    }

    toggleCompletas = (ids) => {
        ids.forEach( id => {
            const tarea = this._listado[id]
            if(!tarea.completadoEn){
                tarea.completadoEn= new Date().toISOString()
            }
        })

        this.listadoArr.forEach( t => {
            if(!ids.includes(t.id)){
                t.completadoEn = null 
            }
        })
    }
    
}

module.exports = Tareas