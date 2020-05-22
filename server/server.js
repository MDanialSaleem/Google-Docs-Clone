const express = require("express");
const socketConfig = require("./socket");
const path = require("path");
const connectDB = require("./connectDB");
const SOCKET_ACTIONS = require("../client/src/commonConstants").SOCKET_ACTIONS;
const app = express();
connectDB();

// body parser middleware.
app.use(express.json({ extended: false }));

// serving the frontend production build.
app.use(express.static(path.join(__dirname, "/../client/build/")));

// since routing is handled at the fronend, we send the same file for all the routes from here.
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/../client/build/index.html"));
});

// setting up api routes. these can technically be defined within this file but that'll just bloat it up.
app.use("/api/users", require("./api/users"));
app.use("/api/documents", require("./api/documents"));

const server = app.listen(8080, () =>
    console.log("Server listening at port 8080")
);
socketConfig.init(server);
const socketServer = socketConfig.getSocket();

socketServer.on("connection", (socket) => {
    console.log("user connected");

    socket.on(SOCKET_ACTIONS.JOIN_ROOM, (payload) => {
        socket.join(toString(payload.room));
    });

    socket.on(SOCKET_ACTIONS.UPDATE_VALUE, (payload) => {
        socket.to(toString(payload.room)).emit(SOCKET_ACTIONS.UPDATE_VALUE, {
            newValue: payload.newValue,
        });
    });

    socket.on(SOCKET_ACTIONS.LEAVE_ROOM, (payload) => {
        console.log(`Socket wants to leave room ${payload.id}`);
    });
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});
