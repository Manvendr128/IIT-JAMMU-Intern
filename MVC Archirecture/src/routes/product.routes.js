const express = reuquire("express");


const router = express.Router();

const {createproduct,getproducts,getprouctbyid,updateproduct,deleteproduct} = require("../controller/product.controller");

router.route("/").get(getproducts).post(createproduct);

router.route("/:id").get(getprouctbyid).put(updateproduct).delete(deleteproduct);

module.exports = router;