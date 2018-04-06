var mongoose = require("mongoose");
var db = require("../config/connection");
var Schema = mongoose.Schema;

var headLineSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    dropDups: true
  },
  link: {
    type: String,
    required: true,
    unique: true
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});
var HeadLine = mongoose.model("Headline", headLineSchema);

module.exports = HeadLine;
