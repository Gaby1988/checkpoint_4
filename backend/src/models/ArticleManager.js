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
		throw new Error("Error get article and price", error);
	}
};

const getAllArticle = async () => {
	try {
		const rows = await database.query("SELECT * FROM products;");
		return rows[0];
	} catch (error) {
		throw new Error("Error get article and price", error);
	}
};

const buyArticle = async (quantity, total) => {
	try {
		const rows = await database.query(
			"INSERT INTO items (quantity, total) VALUES (?, ?)",
			[quantity, total]
		);
		console.info("manager try");
		return rows[0];
	} catch (error) {
		console.info("manager catch", error);
		throw new Error("Error buying article", error);
	}
};

// const buyArticleUpdate = async (id, quantityToAdd, totalToAdd) => {
// try {
// const currentArticle = await database.query(
// "SELECT quantity, total FROM items WHERE id = ?",
// [id]
// );
// const newQuantity = currentArticle[0].quantity + quantityToAdd;
// const newTotal = currentArticle[0].total + totalToAdd;
// const rows = await database.query(
// "UPDATE items SET quantity = ?, total = ? WHERE id = ?",
// [newQuantity, newTotal, id]
// );
// console.info("manager try");
// return rows[0];
// } catch (error) {
// console.info("manager catch", error);
// throw new Error("Error updating article", error);
// }
// };

const buyArticleUpdate = async (id, quantity, total) => {
	try {
		const rows = await database.query(
			"UPDATE items SET quantity = quantity + ?, total = total + ? WHERE id = ?",
			[quantity, total, id]
		);
		return rows[0];
	} catch (error) {
		throw new Error("Error buying article", error);
	}
};

module.exports = {
	getArticleTotalAndPriceTotal,
	getAllArticle,
	buyArticle,
	buyArticleUpdate,
};
