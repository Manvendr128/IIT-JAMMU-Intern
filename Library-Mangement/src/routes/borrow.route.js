const express = require("express");
const router = express.Router();

const { borrowBook,returnbook } = require("../controller/borrow.controller");

router.post("/borrowbook",borrowBook);
router.post("/returnbook",returnbook);


module.exports = router;