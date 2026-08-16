const express = require("express");

const router = express.Router();

const{addbook,getallbook,getbookbyid,updatebook} = require("../controller/book.controller");

router.post("/addbook",addbook);
router.get("/getallbook",getallbook);
router.get("/:id",getbookbyid);
router.put("/:id",updatebook);

module.exports = router;