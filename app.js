const express = require('express')
const path = require('path')
const cors = require("cors")

const teaUserRouter = require("./routes/teaUserRouter")
const teaitmesRouter = require("./routes/teaItems")
const checkOutRouter = require("./routes/checkOutRouter")

const app =express()


const port = process.env.PORT || 3000
console.log(port)

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'/index.html'))
  })

app.use(cors())
app.use(express.json())
app.use(teaUserRouter)
app.use(teaitmesRouter)
app.use(checkOutRouter)

app.listen(port)
console.log("app lising on port")