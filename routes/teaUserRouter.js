const express = require("express")
const db = require("../Data/Database")
const router = express.Router()

router.get("/user",async (req,res)=>{
    const query = `SELECT * FROM users`
    const user = await db.query(query)
    res.json(user[0])
})


module.exports = router