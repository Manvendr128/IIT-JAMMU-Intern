const Product = require("../models/product.model")

// create a product POST

const createproduct = async(req,res,next) =>{
  try{
    const product = await Product.create(req.body)
    res.status(201).json({
      success : true,
      data:product
    })
  }
  catch(error){
    next(error);
  }
}

// get all products GET

const getproducts = async(req,res,next) =>{
  try{
    const products = await Product.find();
    res.status(200).json({
      success: true,
      count : products.length,
      data : products
    })

  }
  catch(error){
    next(error)
  }
}

// get a single product

const getprouctbyid = async(req,res,next)=>{
  try{
    const product = await Product.findById(req.params.id);
    if(!product){
      return res.status(404).json({
        success:false,
        message : "product not found"
      })
    }
    res.json({
      success:true,data:product
    })


  }
  catch(error){
    next(error)
  }
}

//update a product PUT

const updateproduct = async(req,res,next)=>{
  try{
    const product = await Product.findByIdAndUpdate(req.params.id,req.body,{
      new:true,
      runValidators : true
    })
    if(!product){
      return res.status(404).json({
        success:false,
        message : "product not found"
      })
    }

    res.json({
      success:true,
      data:product
    })


  }
  catch(error){
    next(error)
  }
}

// delete the product

const deleteproduct = async(req,res,next)=>{
  try{
    const product = await Product.findByIdAndDelete(req.params.id);
    if(!product){
      return res.status(404).json({
        success:false,
        message : "product not found"
      })
    }
    res.json({
      success : true,
      message:"product deleted successfully"
    })
  }
  catch(error){
    next(error)
  }
}

// upload image
const uploadProductImage = async(req,res,next)=>{
  try{
    if(!req.file){
      return res.status(400).json({
        success:false,
        message:"please upload image"
      })
    }

    const imageUrl = `/uploads/${req.file.filename}` // public  url path
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {image:imageUrl},
      {new:true}
    )
    if(!product){
      return res.status(400).jspn({
        success:false,
        message:"product not fine"
      })
    }
    res.json({
      success: true,
      data:product,imageUrl
    })
  }
  catch(error){
    next(error)
  }
}

module.exports = {createproduct,getproducts,getprouctbyid,updateproduct,deleteproduct,uploadProductImage};
