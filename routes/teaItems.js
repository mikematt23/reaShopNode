const express = require("express")
const db = require("../Data/Database")
const router = express.Router()

router.get("/teaItems",async(req,res)=>{
    const query = `SELECT * FROM teaitems`
    const products = await db.query(query)
    res.json(products[0])
})

router.get("/teaItem/:id",async (req,res)=>{
    const teaId = req.params.id

    const query = `SELECT * FROM teaitems WHERE Id = ${teaId}`
    const teaProduct = await db.query(query)
    if(teaProduct[0][0] === undefined){
        return res.json({product: 
             {
                teaName: "No Product",
                teaDescription: "You manage to get to a product that does not exsit",
                Price: 0
             }})
    }
   
    return res.json({product: teaProduct[0][0]})
})

module.exports = router