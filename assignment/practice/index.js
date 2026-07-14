const express = require("express");
const app = express();
app.use(express.json());

app.get("/",(req,res)=>{
  res.send("server is running");
})

app.get("/search/:id",(req,res)=>{
  res.send(`you asked ${req.params.id}`)
})

app.get("/query",(req,res)=>{
  res.send(`category:${req.query.cat},
    maxprice : ${req.query.max}`)
})
// in json format answer dega
app.get("/query1",(req,res)=>{
  res.json({
    category:req.query.cat,
    maxprice : req.query.max
  })
})


const port = 3300;

app.listen(port,()=>{
  console.log(`Server is running on http://localhost:${port}`);
});