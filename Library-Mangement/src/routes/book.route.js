const express = require("express");

const router = express.Router();

const{addbook,getallbook,getbookbyid,updatebook,searchbook,deletebook} = require("../controller/book.controller");

router.post("/addbook",addbook);
router.get("/getallbook",getallbook);
router.put("/:id",updatebook);
router.get("/search",searchbook);
router.get("/:id",getbookbyid);
router.delete("/:id",deletebook);
module.exports = router;