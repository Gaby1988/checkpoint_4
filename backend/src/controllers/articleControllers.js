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

module.exports = {
	getAllArticlesTotalAndPriceTotal,
};
