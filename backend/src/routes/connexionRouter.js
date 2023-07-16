const express = require("express");

const router = express.Router();
const connexionController = require("../controllers/connexionControllers");
const { verifyPassword } = require("../middlewares/verifyPassword");

router.post("/", verifyPassword, connexionController.verifyUsers);

module.exports = router;
