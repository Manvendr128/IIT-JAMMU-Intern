const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");
const userschema = new mongoose.Schema(
  {
    name:{
      type : String,
      required:[true,"name is required"]
    },
    email:{
      type:String,
      required : [true,"email is required"],
      unique : true, // validation
      lowercase : true
    },
    password:{
      type:String,
      required : [true,"password is required"],
      minlength:[8,"minimum 8 characteers required"]
    },
    role:{
      type:String,
      enum:["user","admin"], // enum menas check only these two are allow not student defined
      default : "user"
    },

    otp:{
      type:String,
      default : ""
    },
    otpExpiry : {
      type:Date
    }
  },
  {timestamps : true}
)
 
// first check then into hashing

userschema.pre("save",async function(next){
  if(!this.isModified("password")); 
  // ye check kr rha hai ki update kiya yaa modified kiya password me agr nhi too aage bdh rha hai
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password,salt) 
  // next();
});

userschema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword,this.password)
}

module.exports = mongoose.model("user",userschema);
