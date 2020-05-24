const { Document, connect } = require("camo");
const URI = "nedb://memory";
let db = null;
class Room extends Document {
    constructor() {
        super();
        // mongoDB ID.
        this.docID = String;
        this.title = String;
        this.document = Object;
        this.users = [String];
    }

    static collectionName() {
        return "room";
    }
}
const connectNEDB = async () => {
    try {
        db = await connect(URI);
        console.log("[INFO] NEDB Connection established");
    } catch (e) {
        console.log("[Error] in NEDB Connection\n");
        console.log(e);
    }
};

module.exports.connectNEDB = connectNEDB;
module.exports.Room = Room;
