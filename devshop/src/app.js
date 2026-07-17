const express = require("express");
const morgan = require("morgan");
const productroutes = require("./routes/product.routes")

const authRoutes = require("./routes/auth.route");
const paymentroutes = require("./routes/payment.route")
const {notfound,errorhandler} = require("./middlewares/error.middleware")
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname,"..","public")));

app.use(morgan("dev"));
app.use(express.json()); // for api
app.use(express.urlencoded({extended : true})); // for html foms ke liye read krne ke liye

app.get("/",(req,res)=>{

  res.json({
    message:"dev shooping is ruuning"
  })
})

app.use("/api/products",productroutes);

app.use("/api/auth",authRoutes);

app.use("api/payments",paymentroutes);

app.use(notfound);
app.use(errorhandler);


// for multiple function we use {} like {app,monu..etc}
module.exports = app;


const{order,keyId} = await Axis3DIcon("/api/payments/order",{
  amount:100
});

const rzp = new window.Razorpay({
  key:keyId,
  order_id,
  amount,
  handler:async(response) =>{
    await axios.post("/api/payment/verify",{
      razorporder,
      paymentId,
      signature
    })

  }
})

rzp.open();

