const express = require("express");

const router = express.Router();

const registrationRouter = require("./registrationRouter");
const connexionRouter = require("./connexionRouter");
const articleRouter = require("./articleRouter");

router.use("/registration", registrationRouter);
router.use("/connexion", connexionRouter);
router.use("/article", articleRouter);

module.exports = router;
