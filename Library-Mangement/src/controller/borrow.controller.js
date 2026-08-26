const Book = require("../model/book.model");
const Borrow = require("../model/borrow.model");


const borrowBook = async(req,res,next)=>{
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
    next(error);
  }
}

const returnbook = async(req,res,next)=>{
  try{
    const{userId,bookId} = req.body;
    const book = await Book.findById(bookId);

    if(!book){
      return res.status(400).json({
        message:"This Book is not Borrowed"
      })
    };

  
    const returnb = await Borrow.findOne({
      user : userId,
      book : bookId,
      returnDate : null,
      // returnDate : new Date(),
      // returnDate,
    })

    if(!returnb){
      return res.status(400).json({
        message : "This Book is not borrowed by this user",
      });
    }

    returnb.returnDate = new Date();
    await returnb.save();

    book.availablecopies +=1;
    await book.save();

    return res.json(201).json({
      message : "book has been return successfully",
      returnb,
    })

  }
  catch(error){
    next(error);
  }
}

module.exports = {borrowBook,returnbook};