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

// 1. standard index GET
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

// NEW route
app.get("/blogs/new", function(req,res){
	res.render("new");	
});

// CREATE route
app.post("/blogs", function(req, res){
	// create blog
	Blog.create(req.body.blog, function(err, newBlog){
		if (err){
			res.render("new");
		}
		else{
			// redirect to index
			res.redirect("/blogs");
		}
	})
	
})


// Design will include: title, image, body, created date
// Basic layout: add header, footer partials, semantic UI, simple Nav Bar