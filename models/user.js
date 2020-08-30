var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserScema = new mongoose.Schema({
	userName : String,
	password : String
});

UserScema.plugin(passportLocalMongoose);
module.exports = mongoose.model("user", UserScema);