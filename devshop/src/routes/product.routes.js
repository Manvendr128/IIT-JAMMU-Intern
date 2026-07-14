const express = require("express");


const router = express.Router();

const {createproduct,getproducts,getprouctbyid,updateproduct,deleteproduct} = require("../controller/product.controller");

const {protect,authorize} = require("../middlewares/auth.middleware")

router.route("/").get(getproducts).post(protect,authorize("admin"),createproduct);

router.route("/:id").get(getprouctbyid).put(updateproduct).delete(deleteproduct);

router.get("/test", (req, res) => {
    res.send("Working");
});

module.exports = router;