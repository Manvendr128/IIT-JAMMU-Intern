const express = require("express");


const router = express.Router();

const {createproduct,getproducts,getprouctbyid,updateproduct,deleteproduct} = require("../controller/product.controller");

router.route("/").get(getproducts).post(createproduct);

router.route("/:id").get(getprouctbyid).put(updateproduct).delete(deleteproduct);

router.get("/test", (req, res) => {
    res.send("Working");
});

module.exports = router;