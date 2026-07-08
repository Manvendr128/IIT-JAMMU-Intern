const mongoose = require("mongoose")

//schema is the blue print
const prodcutschema = new mongoose.Schema(
  {
    name:{
      type:String,
      required:[true,"product name is required"],
    },
    price:{
      type:Number,
      required:[true,"price is required"]
    },
    description:{
      type:String,
      default :""
   },
   instock:{
    type:Boolean,
    default : true
   },

  },
  {timestamps : true}
)

module.exports = mongoose.model("product",prodcutschema);