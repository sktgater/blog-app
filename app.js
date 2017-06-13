// load express, body-parser, mongoose, method-override
var express = require("express"),
app = express(),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
methodOverride = require("method-override");

// configure mongoose
mongoose.connect("mongodb://localhost/blog-app");
// set view engine as ejs
app.set("view engine", "ejs");
// set express static, body-parser, method-override
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

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

// SHOW route
app.get("/blogs/:id", function(req,res){
	Blog.findByID(req.params.id, function(err, foundBlog){
		if (err){
			res.redirect("/blogs");
		}
		else {
			res.render("show", {blog: foundBlog});
		}
	})
})

// EDIT route
app.get("/blogs/:id/edit", function(req,res){
	Blog.findByID(req.params.id, function(err, foundBlog){
		if (err){
			res.redirect("/blogs");
		}	
		else{
			res.render("edit", {blog: foundBlog});
		}
	});
})

// UPDATE route
app.put("/blogs/:id", function(req, res){
	// take the id of url, find the blog, update it with new data
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
		if (err){
			res.redirect("/blogs");
		}
		// redirect to updated blog SHOW page
		else {
			res.redirect("/blogs/" + req.params.id);
		}
	})
})

// DELETE route
app.delete("/blogs/:id", function(req, res){
	// 1. destroy log; 2. redirect
	Blog.findByIdAndRemove(req.params.id, function(err){
		if (err){
			res.redirect("/blogs");
		}
		else{
			res.redirect("/blogs");
		}
	})
})


// Design will include: title, image, body, created date
// Basic layout: add header, footer partials, semantic UI, simple Nav Bar