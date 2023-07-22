const ArticleManager = require("../models/ArticleManager");

const getAllItems = async (req, res) => {
	try {
		const article = await ArticleManager.getItems();
		if (article.length === 0) {
			res.status(404).send("No items");
		} else {
			res.status(200).send(article);
		}
	} catch (error) {
		res.status(500).send(error);
	}
};
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
	const { quantity, total, product_id, user_id } = req.body;
	try {
		const items = await ArticleManager.buyArticle(
			quantity,
			total,
			product_id,
			user_id
		);
		if (items) {
			if (items.length === 0) {
				res.status(404).send("No buy", items);
			} else {
				res.status(200).send(items);
			}
		}
	} catch (error) {
		console.info("ici", error);
		res.status(500).send(error);
	}
};

const buyArticleAndPutInTableItemsUpdate = async (req, res) => {
	const { id } = req.params;
	const { quantity, total } = req.body;
	try {
		const article = await ArticleManager.buyArticleUpdate(id, quantity, total);
		if (article.length === 0) {
			console.info("controller update", total);
			console.info("controller update", quantity);
			res.status(404).send("No buy update");
		} else {
			res.status(200).send(article);
			console.info("controller update");
		}
	} catch (error) {
		console.info("controller update", error);
		res.status(500).send(error);
	}
};

const getArticleByQuantityAndTotalPriceByUser = async (req, res) => {
	try {
		const article = await ArticleManager.getArticleByQuantityAndTotalPrice();
		if (article.length === 0) {
			res.status(404).send("No article and price found");
		} else {
			res.status(200).send(article);
		}
	} catch (error) {
		res.status(500).send(error);
	}
};

module.exports = {
	getAllItems,
	getAllArticlesTotalAndPriceTotal,
	getAllArticleAndPrice,
	buyArticleAndPutInTableItems,
	buyArticleAndPutInTableItemsUpdate,
	getArticleByQuantityAndTotalPriceByUser,
};
