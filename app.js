// set up.. Similiar to default tags for html
const express = require("express")
var cors = require('cors') // use this to use both
// activate to tell to be an express variable
const { TextEncoder, TextDecoder } = require('util');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
const mongoose = require("mongoose")
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')
const Song = require("./models/song")
const jwt = require('jwt-simple')
const User = require("./models/users")
const secret = "supersecret"

app.use(cors())

app.use(bodyParser.json())

router.post("/user", async(req,res) =>{
    if(!req.body.username || !req.body.password){
       res.status(400).json({error: "Missing username or passwword"})
    }
    const newUser = await new User({
       username: req.body.username,
       password: req.body.password,
       status: req.body.status
    })
    try{
       await newUser.save()
       res.sendStatus(201) 
    }
    catch(err){
       res.status(400).send
    }
 })
 
 //authenticate  to sign in
 router.post("/auth", async(req,res) =>{
    if(!req.body.username || !req.body.password){
       res.status(401).json({error: "Missing username or password"})
       return
    }
    //find  user 
    try{
       const user = await User.findOne({username: req.body.username})
       if (!user){
          res.status(401).json({error: "User not found"})
      
       }
       else{
          //check the username and password 
          if(user.password === req.body.password){
             //create a token
             const token = jwt.encode({username: user.username}, secret)
             res.json({token: token, username: user.username})
          }
          else{
             res.status(401).json({error: "Invalid password"})
          }
       }
    }
    catch(err){
       res.status(400).send(err.message)
    }
 
       
    })

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

router.delete("/songs/:id",async(req,res) => {
    try{
        Song.deleteOne({_id: req.params.id})
    }
        catch(err){
            res.status(400).send(err)
    }
})

app.use("/api", router)

app.listen(process.env.PORT || 3000, function () {
    console.log("listening on port", process.env.PORT || 3000);
  });