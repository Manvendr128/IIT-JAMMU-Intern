require("dotenv").config();
const app = require("./src/app");

const connectdb = require('./src/config/db');

const PORT = 4000;


const server = async()=>{
  await connectdb();
  app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
  })
};

server();