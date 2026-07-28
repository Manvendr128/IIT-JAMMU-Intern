const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name:{
      type:String,
      required : [true,"name is required"]
    },
    email:{
      type:String,
      required : [true,"email is required"],
      unique:true,
      lowercase:true
    },
    password:{
      type:String,
      required : [true,"password is mandatory"],
      minlength : [8,"minlength is 8 characters"]
    },
    role:{
      type:String,
      enum:["student","admin"],
      default:"student"
    },
    phone:{
      type:Number,
      required:[true,"mob. no. is mandatory"]
    },
  },
  {
    timestamps : true,
  }
)

module.exports = mongoose.model("User",userSchema);