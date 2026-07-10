const express = require("express");
const morgan = require("morgan");
const produtroutes = ("./routes/product.routes")

const app = express();

app.use(morgan("dev"));
app.use(express.json()); // for api
app.use(express.urlencoded({extended : true})); // for html foms ke liye read krne ke liye
app.use("/api/products",productroutes);

app.get("/",(req,res)=>{

  res.json({
    message:"dev shooping is ruuning"
  })
})

// for multiple function we use {} like {app,monu..etc}
module.exports = app;