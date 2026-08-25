const Book = require("../model/book.model");
const Borrow = require("../model/borrow.model");


const borrowBook = async(req,res)=>{
  try{
    const {userId,bookId} = req.body;
    const book = await Book.findById(bookId);

    if(!book){
      return res.status(404).json({
        message : "Book Not Found",
      });
    }

    if(book.availablecopies <= 0){
      return res.status(400).json({
        message:"Book is Not available",
      })
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);

    book.availablecopies -= 1;
    await book.save();

    const borrow = await Borrow.create({
      user : userId,
      book : bookId,
      issueDate : new Date(),
      dueDate:dueDate,
    })

    res.status(201).json({
      message:"Book Borrowed Successfully",
      borrow,
    })
  }
  catch(error){
    res.status(500).json({
      message : error.message,
    })
  }
}

module.exports = {borrowBook};