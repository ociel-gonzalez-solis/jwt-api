const express = require("express");
const router = express.Router();

const { postLogin, getDashboard } = require("../controllers/main");
const isAuthenticated = require("../middleware/auth");

router.route("/dashboard").get(isAuthenticated, getDashboard);
router.route("/login").post(postLogin);

module.exports = router;
