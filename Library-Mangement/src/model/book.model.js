const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const bookSchema = new mongoose.Schema({
  title:{
    type:String,
    required:[true,"title name is required"],
    trim:true,
  },
  author:{
    type:String,
    required:[true,"book author name is mandatory"],
    trim:true,
  },
  isbn:{
    type : String,
    required:true,
    unique:true,
    trim:true,
  },
  totalcopies:{
    type:Number,
    required:true,
    min:1,
  },
  availablecopies:{
    type:Number,
    required : true,
    min:0,
  },
  category:{
    type:String,
    required:true,
    trim:true,
  }
});

module.exports = mongoose.model("Book",bookSchema);