const User = require("../model/user.model");

const register = async(req,res,next)=>{
  try{
    const{name,email,password,role,phone} = req.body;

    const exist = await User.findOne({email});
    if(exist){
      return res.status(400).json({
        success:false,
        message:"email is already exist"
      })
    }
    const user = await User.create({name,email,password,role,phone});

    res.status(200).json({
      success:true,
      user:{
        id:user._id,
        name:user.name,
        email:user.email,
        password:user.password,
        role:user.role,
        phone:user.phone,
      }
    })

  }
  catch(error){
    next(error);
  }
}

const login = async(req,res,next)=>{
  try{
    const{email} = req.body;
    if(!email){
      return res.status(400).json({
        success:false,
        message:"Email are required"
      })
    }

    const user = await User.findOne({email});

    if(!user){
      return res.status(401).json({
        success:false,
        mesaage:"invalid ceredentials",
      })
    }

    // const isMatch = await user.matchPassword(password);

    // if(!isMatch){
    //   return res.status(401).json({
    //     success:false,
    //     message:"invalid ceredentials"
    //   })
    // }

    res.status(201).json({
      success:true,
      user:{
        id:user._id,
        name:user.name,
        email:user.email,
        role:user.role,
        phone:user.phone,
      }
    })
  }
  catch(error){
    next(error);
  }
}

const getMe = async(req,res,next)=>{
    try{
      res.json({
        succes:true,
        message:req.User,
      });
    }
    catch(error){
      next(error);
    }
}
const update = async(req,res,next)=>{
  try{
    const{id} = req.params;
    const updateUser = await User.findByIdAndUpdate(
      id,
      req.body,
      {
        new:true,
        runValidators : true,
      }
    );
    if(!updateUser){
      return res.status(404).json({
        success:false,
        message:"user not found"
      })
    }
    res.status(200).json({
      success : true,
      message : "update successfully",
      data : req.body,
    })
  }
  catch(error){
    next(error);
  }
}

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {register,login,getMe,update,getAllUsers};