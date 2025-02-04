const express = require("express")
const db = require("../Data/Database")
const router = express.Router()
const bcrypt = require("bcrypt")


const Hash = 10

router.post("/teaSignUp",async(req,res)=>{
    const userName = req.body.userName
    const password = req.body.password
    bcrypt.hash(password, Hash, async function(err, hash) {
        try{
          const query = `INSERT INTO teaUser (userName,Password) VALUES ("${userName}","${hash}")`
          await db.query(query)
          const userQuery = ` SELECT * from teaUser WHERE userName="${userName}"`
          const user = await db.query(userQuery)

          return res.json({message:"Added",user: user[0][0]})
        }catch(error){
           res.json({error:error, message:"not added"})
        }
    });
})

router.post("/teaLogin",async (req,res)=>{
    const userName = req.body.userName
    const password = req.body.password

    const userQuery = `SELECT * FROM teaUser WHERE userName = "${userName}"`
    const user = await db.query(userQuery)

    if(user[0][0] === undefined){
        return res.json({message:"No user"})
    }
    bcrypt.compare(password, user[0][0].Password,async (err,result)=>{
        if(result === true){
            return res.json({message:"Correct",user: user[0][0]})
        }else{
            return res.json({message:"Incorrect"})
        }
    })
})


module.exports = router