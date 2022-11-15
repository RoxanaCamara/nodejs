class Mensaje {
    constructor(id, nombre, mensaje){
        this.id=id;
        this.nombre=nombre
        this.mensaje=mensaje
    }
}


class ChatMensajes {

    constructor(){
        this.mensajes=[]
        this.usuarios={}
    }

    ultimos10(){
        return this.mensajes.slice(0,10)
    }

    usuariosArray(){
        return Object.values( this.usuarios)
    }

    enviarMensaje(id, nombre, mensaje){
        this.mensajes.unshift( new Mensaje(id, nombre, mensaje))
    }

    agregarUsuario( usuario ){
        this.usuarios[usuario.id]= usuario
    }

    desconectarUsuario(usuario){
        delete this.usuarios[usuario.id]
    }
    
}

module.exports= {
    ChatMensajes
}