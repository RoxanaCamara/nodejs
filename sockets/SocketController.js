const { Socket } = require("socket.io")

const socketController = ( socket = new Socket ) => {
    console.log("🚀 ~ file: SocketController.js ~ line 4 ~ sockerController ~ socket", socket.id)
    
}

module.exports={
    socketController
}