const express = require('express')
const mongoose = require('mongoose')
const {MONGOURI} =require('./keys')
//const cors = require('cors')

require('./models/user')
require('./models/post')

const app=express()


app.use(express.json())
//app.use(cors())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))


mongoose.connect(MONGOURI, 
    {useNewUrlParser: true, 
    useUnifiedTopology: true})

mongoose.connection.on('connected', ()=>{
    console.log("Connected to mongo ")
})

mongoose.connection.on('error', (err)=>{
    console.log("error in connecting ", err)
})


const PORT= 5000
app.listen(PORT, ()=>console.log(`serving is running at ${PORT}`))