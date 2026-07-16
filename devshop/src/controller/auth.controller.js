const jwt = require("jsonwebtoken");
const User = require("../models/user.model")
const transporter = require("../config/email");

// helper create a jwt token
const generatetoken = (user) =>{
  return jwt.sign({id:user._id,email:user.email,role:user.role},process.env.JWT_SECRET,{
    expiresIn : process.env.JWT_EXPIRE,
  })
}

//generate otp

function generateotp(){
  return Math.floor(100000 + Math.random() * 900000).toString()
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

const forgetPassword = async (req,res,next)=>{
  try{
    const {email} = req.body;
    const user = await User.findOne({email})

    if(!user){
      return res.status(404).json({
        success:false,
        message:"user not found"
      })
    }

  const otp = generateotp();

  user.otp = otp;
  user.otpExpiry = Date.now() + 5 * 60 *1000;

  await user.save();

  await transporter.sendMail({
    from:process.env.EMAIL_USER,
    to:email,
    subject : "Forget password otp verification",
    html:`
    <h2>Password reset OTP</h2>
    <p> you otp is:</p>
    <h1>${otp}</h1>
    <p>This otp is valid for 5 minutes only </p>

    `
  })

  res.json({
    success:true,
    message:"otp sent successfully"
  })
   

  }
  catch(error){
    next(error)
  }
}

const verifyOtp = async (req,res,next)=>{
  const {email,otp} = req.body;

  const user = await User.findOne({email})

  if(!user){
    return res.status(404).json({
        success:false,
        message:"user not found"
      })
  }

  if(user.otp !== otp){
    return res.status(400).json({
        success:false,
        message:"invalid otp"
      })
  }

  res.json({
        success:true,
        message:"otp verified"
  })
}

module.exports = {register,login,getMe,forgetPassword,verifyOtp};