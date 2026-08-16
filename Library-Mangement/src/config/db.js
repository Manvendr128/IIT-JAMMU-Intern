const mongoose = require("mongoose");
// const db = process.env.MONGODB_URI;

// mongoose.connect(db);

// mongoose.connect("mongodb://localhost:27017/libraryDB")
const connectdb = async()=>{
  try{
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("database connected");
  }
  catch(error){
    console.log("database connection error",error.message);
    process.exit(1);
  }

}

// connectdb();

module.exports = connectdb;