const express = require("express")
const db = require("../Data/Database")
const Stripe = require("stripe")

const router = express.Router()
console.log(process.env)
const stripe = Stripe(process.env.STRIPEKEY)

router.post("/teaCheckout",async(req,res)=>{
  const amount = req.body.amount
  const session = await stripe.checkout.sessions.create({
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Tea-Cart',
        },
        unit_amount: amount*100,
      },
      quantity: 1,
    }],
    mode: 'payment',
    ui_mode: 'embedded',
    return_url: 'https://rococo-moxie-2d4439.netlify.app/ThankYou'
  });

  res.send({clientSecret: session.client_secret, id: session.id});
})

router.get('/session_status', async (req, res) => {
    const id = req.body.id
    const session = await stripe.checkout.sessions.retrieve(id);
  
    res.send({
      status: session.status,
      payment_status: session.payment_status,
      customer_email: session.customer_details.email
    });
  });


module.exports = router