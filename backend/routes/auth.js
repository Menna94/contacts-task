const express = require("express");
const router = express.Router();
const { login, getUser } = require("../controllers/auth");
const { protect } = require("../middleware/protect");

//Login User
//POST /auth/login
router.post("/login", login);

//Get Current Loggedin User
//GET /auth/user
router.get("/user", protect, getUser);

module.exports = router;
