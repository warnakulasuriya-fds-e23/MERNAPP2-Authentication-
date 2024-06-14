const { login, signup } = require("../controllers/UserController");
const express = require("express");
const router = express.Router();

router.get("/login", login);

router.post("/signup", signup);

module.exports = router;
