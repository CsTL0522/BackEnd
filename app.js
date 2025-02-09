// set up.. Similiar to default tags for html
const express = require("express")
// activate to tell to be an express variable
const app = express()
const router = express.Router()

// start web server... app.listen(portnumber,function)
app.listen(3000,function() {
    console.log("listening on port 3000")
})

// making an api using routes
// routes are used to handle browser requests, 
// look like url, dynamically handled using function


// GET requests for http://localhost:3000/hello

app.get("/hello", function(req,res) {
    res.send("<h1>Hello Express</h1>")
})
app.get("/goodbye", function(req,res) {
    res.send("<h1>Goodbye Express</h1>");
});
