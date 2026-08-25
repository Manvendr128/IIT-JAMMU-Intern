const express = require("express");
const router = express.Router();

const { borrowBook } = require("../controller/borrow.controller");

router.post("/borrowbook",borrowBook);


module.exports = router;