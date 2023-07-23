const express = require("express");

const router = express.Router();
const articleControllers = require("../controllers/articleControllers");

router.get("/items", articleControllers.getAllItems);
router.get("/", articleControllers.getAllArticlesTotalAndPriceTotal);
router.get("/articles-prices", articleControllers.getAllArticleAndPrice);
router.get("/articles-prices-by-user", articleControllers.getArticleByQuantityAndTotalPriceByUser);
router.post("/", articleControllers.buyArticleAndPutInTableItems);
router.put("/:id", articleControllers.buyArticleAndPutInTableItemsUpdate);
router.delete("/:id", articleControllers.deleteItemById);

module.exports = router;
