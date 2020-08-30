var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var passport = require("passport");
var localStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var user = require("./models/user");
var app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended : true}));
mongoose.connect("mongodb://localhost/auth_demo",{useNewUrlParser: true, useUnifiedTopology : true});

app.use(require("express-session")({
	secret :"East or West India is the best",
	resave : false,
	saveUninitialized : false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());


// ================
// Routes
//=================
app.get("/",function(req, res){
	res.render("home");
});

app.get("/secret",function(req , res){
	res.render("secretPage");
});
app.get("/register",function(req, res){
	res.render("register");
});
app.post("/register",function(req, res){
	user.register(new user({username : req.body.username}), req.body.password, function(err,user){
		if (err){
			console.log(err);
			return res.render('register');
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/secret");
		})
	});
});
// Login route
app.post("/login",passport.authenticate("local",{
	successRedirect: "/secret",
	failureRedirect : "/login"
}),function(req , res){
});

app.get("/login",function(req, res){
	res.render("login");
});

app.listen(3000, function(){
	console.log("your app is runnning ... ");
})