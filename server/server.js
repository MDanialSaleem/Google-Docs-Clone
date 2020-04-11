const express = require("express");
const path = require("path");
const app = express();
const connectDB = require("./connectDB");


connectDB();

app.use(express.static(path.join(__dirname, "/../client/build/")));

app.get("/ping", function (req, res) {
    return res.send("pong");
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/../client/build/index.html"));
});

app.listen(8080, () => console.log("Server listening at port 8080"));
