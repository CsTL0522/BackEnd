// set up.. Similiar to default tags for html
const express = require("express")
var cors = require('cors') // use this to use both
// activate to tell to be an express variable
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')
const Song = require("./models/song")

app.use(cors())

app.use(bodyParser.json())


// grab all songs in database

router.get("/songs", async(req,res) => {
    try {
        const songs = await Song.find({})
        res.send(songs)
        console.log(songs)
    }
    catch (err){
        console.log(err)
    }
})

router.post("/songs", async(req,res) =>{
    try{
        const song = await new Song(req.body)
        await song.save()
        res.status(201).json(song)
        console.log(song) 
    }
    catch(err){
        res.status(400).send(err)
    }
})

// grab single song

router.get("/songs/:id", async (req,res) =>{
    try{
        const song = await Song.findById(req.params.id)
        res.json(song)
    }
    catch (err) {
        res.status(400).send(err)
    }
})


//update uses put
router.put("/songs/:id", async (req,res) =>{
    try{
        const song = req.body
        await Song.updateOne({_id: req.params.id},song)
        console.log(song)
        res.sendStatus(204)
    }
    catch(err){
       res.status(400).send(err)
    }
})


app.use("/api", router)

app.listen(process.env.PORT || 3000, function () {
    console.log("listening on port", process.env.PORT || 3000);
  });