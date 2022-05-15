const config = {};  
const conn = `mongodb+srv://admin:admin123@cluster0.8aedd.mongodb.net/dbetsy?retryWrites=true&w=majority`;

const mongoose = require("mongoose");


const InitiateMongoServer = async () => {
    try {
        await mongoose.connect(conn, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to DB !!");
    } catch (e) {
        console.log(e);
        throw e;
    }
};

module.exports = InitiateMongoServer;