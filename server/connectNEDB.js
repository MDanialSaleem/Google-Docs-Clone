const { Document, connect } = require("camo");
const initialValue = require("./models/Constants/InitialValue");
const URI = "nedb://memory";
let db = null;
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

class Room extends Document {
    constructor() {
        super();
        this.title = String;
        this.document = Object;
    }

    static collectionName() {
        return "room";
    }
}

const displayAll = async () => {
    try {
        return Room.find();
    } catch (e) {
        console.log("[Error] in displaying a new document");
    }
};

const saveRoom = async () => {
    try {
        const mydoc = Room.create({
            title: "MyRoom",
            document: initialValue,
        });

        return mydoc.save();
    } catch (e) {
        console.log("[Error] in creating a new room\n");
        console.log(e);
    }
};

const connectNEDB = async () => {
    try {
        db = await connect(URI);
        console.log("[INFO] NEDB Connection established");
    } catch (e) {
        console.log("[Error] in NEDB Connection\n");
        console.log(e);
    }
};

connectNEDB();
const func = async () => {
    await saveRoom();
    const res = await displayAll();
    console.log(JSON.stringify(res));
};

setTimeout(func, 2000);
