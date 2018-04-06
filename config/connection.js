var mongoose = require("mongoose");

mongoose.Promise = Promise;
var mng = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadLines";
var db = mongoose.connect(mng, {
  useMongoClient: true
});

module.exports = db
