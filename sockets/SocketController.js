const { Socket } = require("socket.io")
const { comprobarJWT } = require("../helper/generar-jwt")
const { ChatMensajes } = require("../models/chat-mensajes")


const chatMensajes = new ChatMensajes()

const socketController = async( socket = new Socket, io ) => {
    const usuario = await comprobarJWT(socket.handshake.headers['x-token'])
    
    if(!usuario){
        return socket.disconnect()
    }
    
    chatMensajes.agregarUsuario(usuario)
    io.emit('usuarios-activos', chatMensajes.usuariosArray())
    
    socket.on( 'disconnect', () => { 
        chatMensajes.desconectarUsuario(usuario.id)
        io.emit('usuarios-activos', chatMensajes.usuariosArray()) 
    })


    socket.on( 'enviar-mensajes', ({mensaje}) => { 
        chatMensajes.enviarMensaje(usuario.uid, usuario.name, mensaje)
        io.emit('recibir-mensajes', chatMensajes.ultimos10())        
    })
}

module.exports={
    socketController
}