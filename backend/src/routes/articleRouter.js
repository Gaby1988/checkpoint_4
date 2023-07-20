const express = require("express");

const router = express.Router();
const articleControllers = require("../controllers/articleControllers");

router.get("/", articleControllers.getAllArticlesTotalAndPriceTotal);
router.get("/articles-prices", articleControllers.getAllArticleAndPrice);
router.post("/", articleControllers.buyArticleAndPutInTableItems);
router.put("/:id", articleControllers.buyArticleAndPutInTableItemsUpdate);

module.exports = router;
