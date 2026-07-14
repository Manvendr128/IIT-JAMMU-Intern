const jwt = require("jsonwebtoken");
const User = require("../models/user.model")

// helper create a jwt token
const generatetoken = (user) =>{
  return jwt.sign({id:user._id,email:user.email,role:user.role},process.env.JWT_SECRET,{
    expiresIn : process.env.JWT_EXPIRE,
  })
}

const register = async(req,res,next)=>{
  try{
    const{name,email,password,role} = req.body

    const exist = await User.findOne({email});
    if(exist){
      return res.status(400).json({
        success:false,
        message:"email already exist"
      })
    }
    const user = await User.create({name,email,password,role});

    res.status(201).json({
      success : true,
      token : generatetoken(user._id),
      user:{
        id : user._id,
        name : user.name,
        email : user.email,
        role : user.role
      }
    })
  }
  catch(error){
    next(error)
  }
}

const login = async(req,res,next)=>{
  try{
    const {email,password} = req.body;

    if(!email || !password){
      return res.status(400).json({
        success:false,
        message:"email or pass are required"
      })
    }

    // if exist go to db and check pass and email to login

    const user = await User.findOne({email});
    if(!user){
      return res.status(401).json({
        success : false,
        message:"invalid credentials"
      })
    }

    const isMatch = await user.matchPassword(password); // ye check krke layega model me ki password match hai yaa nhi

    if(!isMatch){
      return res.status(401).json({
        success:false,
        message:"invalid credentials"
      })
    }

    res.status(201).json({
      success : true,
      token : generatetoken(user),
      user:{
        id : user._id,
        name : user.name,
        email : user.email,
        role : user.role
      }
    })



  }
  catch(error){
    next(error)
  }
}

const getMe = async(req,res,next)=>{
  try{
    res.json({
      success:true,
      user:req.user
    })
  }
  catch(error){
    next(error)
  }
}

module.exports = {register,login,getMe};