const express = require("express");

const router = express.Router();

const registrationRouter = require("./registrationRouter");
const connexionRouter = require("./connexionRouter");

router.use("/registration", registrationRouter);
router.use("/connexion", connexionRouter);

module.exports = router;
