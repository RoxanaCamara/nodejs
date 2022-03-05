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

    crearTarea = (desc) => {
        const t = new Tarea(desc);
        this._listado[t.id]=t
    }
}

module.exports = Tareas