const express = require("express");
const path = require("path");
const connectDB = require("./connectDB");

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

app.listen(8080, () => console.log("Server listening at port 8080"));
