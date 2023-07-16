const express = require("express");

const router = express.Router();
const articleControllers = require("../controllers/articleControllers");

router.get("/", articleControllers.getAllArticlesTotalAndPriceTotal);

module.exports = router;
