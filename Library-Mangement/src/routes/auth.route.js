const express = require("express");

const router = express.Router();

const{register,login,getMe,update,getAllUsers} = require("../controller/auth.controller");

router.post("/register",register);
router.post("/login",login);
router.get("/me",getMe);
router.put("/:id",update);
router.get("/all",getAllUsers);

module.exports = router;

