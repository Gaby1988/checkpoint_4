const database = require("../../database");

const getArticleTotalAndPriceTotal = async () => {
	try {
		const rows = await database.query(
			`SELECT users.id AS userID, users.email AS mail,
		SUM(items.quantity * (products.id = users_products_items.product_id = users_products_items.user_id)) AS totalQuantity,
		SUM(items.total * (products.id = users_products_items.product_id = users_products_items.user_id)) AS totalPanier
		FROM users_products_items
		JOIN users ON users.id = users_products_items.user_id
		JOIN items ON items.id = users_products_items.item_id
		JOIN products ON products.id = users_products_items.product_id
		WHERE users.id = 1;
		`
		);
		return rows[0];
	} catch (error) {
		throw new error("Error get article and price", error);
	}
};

module.exports = {
	getArticleTotalAndPriceTotal,
};
