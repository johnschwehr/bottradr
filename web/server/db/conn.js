const { MongoClient } = require("mongodb");
const Db = process.env.DB_URI;
const client = new MongoClient(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var _db;

module.exports = {
    connectToServer: function (callback) {
        client.connect(function(err, db) {
            // Verify we got a good "db" object
            if (db) {
                _db = db.db("bottradr")
                console.log("Successfully connected to bottradr.");
            }
            return callback(err);
        });
    },

    getDb: function () {
        return _db;
    }
};