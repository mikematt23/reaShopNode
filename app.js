const express = require('express')
const teaUserRouter = require("./routes/teaUserRouter")
const app =express()

const port = 3000
app.use(express.json())
app.use(teaUserRouter)

app.listen(port,()=>{
    console.log(`app listening on port: ${port}`)
})