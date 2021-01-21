const { JWT_SECRET } = require("../keys")
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
const User = mongoose.model("User")




module.exports=(req, res, next)=>{
    const {authorization} = req.headers
//authorization === Bearer jwhdjhwjdwjdhwjhdjwhd.dwjdhjh
    if(!authorization){
        res.status(401).json({error: "you mst be logged in"})
    }
    const token = authorization.replace('Bearer ', '')
    jwt.verify(token, JWT_SECRET, (err, payload)=>{
        if(err){
            return res.status(404).json({ error : "you must be logged in from require login"})
        }
        const {_id} = payload
        User.findById(_id)
        .then((userdata)=>{
            req.user=userdata
            next()
        })
        



    })

}