const mongoose = require("mongoose")

// asynchronous function because it takes time to connect 

// process mean,

const connectdb = async() =>{
  try{
    const connection = await mongoose.connect(process.env.MONGO_URI)

    console.log(`Mongosb connected succesfully`)
  }
  catch(error){
    console.error(`mongo DB Not connected: ${error.message}`)
    process.exit(1);
  }
}

module.exports = connectdb;