const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://clambert72:password0123@songdb.fpljp.mongodb.net/?retryWrites=true&w=majority&appName=SongDB",{useNewURLParser: true})

module.exports = mongoose