const mongoClient = require("mongodb").MongoClient;
const state = { db: null };
module.exports.connect = (done) => {
    console.log("connect working ");
    const url = "mongodb://127.0.0.1:27017";
    const dbname = "task";
    mongoClient.connect(url, (err, data) => {
        console.log("connect enterd");
        if (err) {
            console.log("error occured");
            return done(err);
        } else {
            console.log("sucesss");
            state.db = data.db(dbname);
            done();
        }
    });
    console.log("work not");
};

module.exports.get = () => {
    return state.db;
};
