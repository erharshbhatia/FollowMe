const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    followers:[{type: ObjectId, ref: "User"}],
    following:[{type: ObjectId, ref: "User"}],
    pic: {
        type: String,
        default: "https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png"
    }

})


mongoose.model("User", userSchema)
