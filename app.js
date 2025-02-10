// set up.. Similiar to default tags for html
const express = require("express")
var cors = require('cors') // use this to use both
// activate to tell to be an express variable
const app = express()
const router = express.Router()

app.use(cors())


// start web server... app.listen(portnumber,function)
// app.listen(3000,function() {
//     console.log("listening on port 3000")
// })

// making an api using routes
// routes are used to handle browser requests, 
// look like url, dynamically handled using function

app.get("/", (req, res) => {
  res.send("Welcome to the backend song application!");
});
// GET requests for http://localhost:3000/hello


router.get("/songs", function(req,res) {
    const songs = [
        {
            title: "We Found Love",
            artist: "Rihanna",
            popularity: 10,
            releaseDate: new Date(2011, 9, 22),
            genre: ["electro house"]
        },
        {
            title: "Happy",
            artist: "Pharrell Williams",
            popularity: 10,
            releaseDate: new Date(2013, 11, 21),
            genre: ["soul", "new soul"]
        },

    ]

    res.json(songs)
})

// all requests taht use an api start with /api...
    // localhost:3000/api/songs
app.use("/api", router)

app.listen(process.env.PORT || 3000, function () {
    console.log("listening on port", process.env.PORT || 3000);
  });