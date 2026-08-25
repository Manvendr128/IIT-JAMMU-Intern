const express = require("express");
const app = express();

const authroutes = require("./routes/auth.route");
const bookroutes = require("./routes/book.route");
const borrowroutes = require("./routes/borrow.route");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res) => {
  res.send("Server Working");
});

app.put("/test", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});


app.use("/api/user",authroutes);
app.use("/api/book",bookroutes);
app.use("/api/borrow",borrowroutes);

module.exports = app;