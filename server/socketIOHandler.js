const jwt = require("jsonwebtoken");
const Document = require("./models/Document");
const User = require("./models/User");
const keys = require("./constants.private");
const socketServer = require("./configFuncs/socketConfig").getSocket();
const SOCKET_ACTIONS = require("../client/src/commonConstants").SOCKET_ACTIONS;
const Room = require("./configFuncs/connectNEDB").Room;
module.exports = (socket) => {
    socket.on(SOCKET_ACTIONS.JOIN_ROOM, async (payload) => {
        const documentId = payload.document; //id of the room.
        const userId = jwt.verify(payload.token, keys.jwtSecret).user.id;
        const mongoDocument = await Document.findById(documentId); //get document from mongo.
        const { name } = await User.findById(userId);

        socket.join(toString(documentId));

        let room = await Room.findOne({ docID: documentId });

        if (room) {
            // if there is someone already editing this document.
            room.users.push({ userId, name });
            await room.save();
        } else {
            room = Room.create({
                docID: documentId,
                title: mongoDocument.name,
                document: mongoDocument.content,
                users: [{ userId, name }],
                activeUser: null,
            });
            await room.save();
        }
        // send to only the client that sent the request.
        socketServer.to(socket.id).emit(SOCKET_ACTIONS.JOIN_ACCEPTED, {
            newValue: room.document,
            onlineUsers: room.users.map((user) => user.name),
            permission: false,
        });
        // send to other clients informing that a new user has joined.
        socket.to(toString(payload.room)).emit(SOCKET_ACTIONS.USERS_CHANGED, {
            onlineUsers: room.users.map((user) => user.name),
        });
    });

    socket.on(SOCKET_ACTIONS.UPDATE_VALUE, async (payload) => {
        const room = await Room.findOne({ docID: payload.documentId });

        room.document = payload.newValue;
        await room.save(); //first save to in memory store and then emit.
        socket.to(toString(payload.room)).emit(SOCKET_ACTIONS.UPDATE_VALUE, {
            newValue: payload.newValue,
        });
    });

    socket.on(SOCKET_ACTIONS.EDIT_REQUEST, (payload, callback) => {
        callback({ permission: true });
    });

    socket.on(SOCKET_ACTIONS.LEAVE_ROOM, async (payload) => {
        console.log("LEFT");
        const documentId = payload.document;
        const userId = jwt.verify(payload.token, keys.jwtSecret).user.id;
        const mongoDocument = await Document.findById(documentId);

        const room = await Room.findOne({ docID: documentId });
        room.users = room.users.filter((user) => user.userId !== userId);

        // if the last user editing the document has left, save everything to mongo and delete the store.
        if (room.users.length === 0) {
            mongoDocument.content = room.document;
            await mongoDocument.save();
            await room.delete();
        } else {
            await room.save();
            socket
                .to(toString(payload.room))
                .emit(SOCKET_ACTIONS.USERS_CHANGED, {
                    onlineUsers: room.users.map((user) => user.name),
                });
        }
    });
    socket.on("disconnect", () => {});
};
