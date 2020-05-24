const socketio = require("socket.io");
let io = null;

module.exports = {
    init: (server) => {
        io = socketio(server);
    },
    getSocket: () => {
        if (!io) {
            throw new Error("Socket server not creater");
        }
        return io;
    },
};
