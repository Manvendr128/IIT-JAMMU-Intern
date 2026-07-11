require("dotenv").config();


const app = require("./src/app");
const connectdb = require("./src/config/db")



// const port = 3000;
const port = process.env.PORT || 3000;

const server = async() =>{
  await connectdb();
  app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
  })
}

server();