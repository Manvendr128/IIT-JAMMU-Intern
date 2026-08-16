const express = require("express");
const app = express();

const routes = require("./routes/auth.route");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res) => {
  res.send("Server Working");
});

app.put("/test", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});


app.use("/api/user",routes);

module.exports = app;