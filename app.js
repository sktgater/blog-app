// load express, body-parser, mongoose
var express = require("express"),
app = express(),
bodyParser = require("body-parser"),
mongoose = require("mongoose");

// configure mongoose
mongoose.connect("mongodb://localhost/blog-app");
// set view engine as ejs
app.set("view engine", "ejs");
// set express static, body-parser
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(process.env.PORT, process.env.IP, function(){
	console.log("Server Started");
})

// mongoose setup schema
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}	// also set default
});

// compile this schema into model
var Blog = mongoose.model("Blog", blogSchema);

// Routes

// 1. standard GET
app.get("/", function(req,res){
	res.redirect("/blogs");
})

app.get("/blogs", function(req,res){
	Blog.find({}, function(err,blogs){
		if (err){
			console.log("ERROR");
		}
		else{
			res.render("index", {blogs: blogs});
		}
	});
	res.render("index");	
});


// Design will include: title, image, body, created date
// Basic layout: add header, footer partials, semantic UI, simple Nav Bar