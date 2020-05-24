const express = require("express");
const path = require("path");
const socketConfig = require("./configFuncs/socketConfig");
const connectDB = require("./configFuncs/connectDB");
const connectNEDB = require("./configFuncs/connectNEDB").connectNEDB;

const app = express();

connectDB();
connectNEDB();

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

socketServer.on("connection", require("./socketIOHandler"));
