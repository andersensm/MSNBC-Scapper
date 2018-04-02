var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 3000;

var app = express();

var router = express.Router();

require("./routes/routers")(router);

app.use(express.static(__dirname + "/public"));

app.engine("handlebars", expressHandlebars({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);

mongoose.Promise = Promise;
var mng = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadLines";
mongoose.connect(mng, function (error) {
    if (error) {
        console.log(error);
    }
    else {
        console.log("mongoose connection is successfull");
    }
});
app.listen(PORT, function () {
    console.log("Listening on port:" + PORT);
});
