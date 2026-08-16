const Book = require("../model/book.model");

const addbook = async(req,res,next)=>{
  try{
    const{title,author,isbn,totalcopies,availablecopies,category} = req.body;
    const exist = await Book.findOne({isbn});
    if(exist){
      return res.status(400).json({
        success : false,
        message : "this book already exist"
      })
    }

    const book = await Book.create({title,author,isbn,totalcopies,availablecopies,category}) ;

    return res.status(200).json({
      success : true,
      book : {
        id : book._id,
        title : book.title,
        author : book.author,
        isbn : book.isbn,
        totalcopies : book.totalcopies,
        availablecopies : book.availablecopies,
        category : book.category,
      },
    })

  }
  catch(error){
    next(error)
  }
}

 const updatebook = async(req,res,next)=>{
  try{
    const {id} = req.params;

    const update = await Book.findByIdAndUpdate(
      id,
      req.body,
      {
        new : true,
        runValidators : true 
      }
    )
    if(!update){
      return res.status(404).json({
        success:false,
        message:"your book is not update",
      })
    }
    res.status(200).json({
      success:true,
      message:"your book has been updated",
      data : update,
    })
  }
  catch(error){
    next(error);
  }
 }

const getbookbyid = async(req,res,next)=>{
  try{
    const {id} = req.params;
    const getbook = await Book.findById(
      id,
      // {
      //   new : true,
      //   runValidators:true,
      // }
    )
    if(!getbook){
      return res.status.json({
        success : false,
        message : "book not found"
      })
    }
    res.status(200).json({
      success:true,
      message : "here is your book",
      data : getbook,
    })
  }
  catch(error){
    next(error);
  }
}

const getallbook = async(req,res,next)=>{
  try{
    const books = await Book.find().select("-isbn");

    res.status(200).json({
      success:true,
      message:books.length,
      books,
    })
  }
  catch(error){
    next(error);
  }
}

module.exports = {addbook,getallbook,getbookbyid,updatebook};