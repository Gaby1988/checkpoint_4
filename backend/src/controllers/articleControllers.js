const ArticleManager = require("../models/ArticleManager");

const getAllArticlesTotalAndPriceTotal = async (req, res) => {
	try {
		const article = await ArticleManager.getArticleTotalAndPriceTotal();
		if (article.length === 0) {
			res.status(404).send("No article and price found");
		} else {
			res.status(200).send(article);
		}
	} catch (error) {
		res.status(500).send(error);
	}
};

const getAllArticleAndPrice = async (req, res) => {
	try {
		const article = await ArticleManager.getAllArticle();
		if (article.length === 0) {
			res.status(404).send("No article and price found");
		} else {
			res.status(200).send(article);
		}
	} catch (error) {
		res.status(500).send(error);
	}
};

const buyArticleAndPutInTableItems = async (req, res) => {
	const { quantity, total } = req.body;
	try {
		const article = await ArticleManager.buyArticle(quantity, total);
		if (article.length === 0) {
			res.status(404).send("No buy");
		} else {
			res.status(200).send(article);
		}
	} catch (error) {
		res.status(500).send(error);
	}
};
const buyArticleAndPutInTableItemsUpdate = async (req, res) => {
	const { id } = req.params;
	const { quantity, total } = req.body;
	try {
		const article = await ArticleManager.buyArticleUpdate(
			id,
			quantity,
			total
		);
		if (article.length === 0) {
			res.status(404).send("No buy update");
			console.info("controller update");
		} else {
			res.status(200).send(article);
			console.info("controller update");
		}
	} catch (error) {
		console.info("controller update", error);
		res.status(500).send(error);
	}
};

module.exports = {
	getAllArticlesTotalAndPriceTotal,
	getAllArticleAndPrice,
	buyArticleAndPutInTableItems,
	buyArticleAndPutInTableItemsUpdate,
};
