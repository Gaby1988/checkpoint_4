const database = require("../../database");

const getItems = async () => {
	try {
		const rows = await database.query("SELECT * FROM items");
		return rows[0];
	} catch (error) {
		throw new Error("Error get items", error);
	}
};

const getArticleTotalAndPriceTotal = async () => {
	try {
		const rows = await database.query(
			`SELECT users.id AS userID, users.email AS mail,
			SUM(items.quantity * (products.id = items.product_id = items.user_id)) AS totalQuantity,
			SUM(items.total * (products.id = items.product_id = items.user_id)) AS totalPanier
			FROM items
			JOIN users ON users.id = items.user_id
			JOIN products ON products.id = items.product_id
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
		const rows = await database.query(
			"SELECT *, products.id AS produitID FROM products;"
		);
		return rows[0];
	} catch (error) {
		throw new Error("Error get article and price", error);
	}
};

const buyArticle = async (quantity, total, product_id, user_id) => {
	try {
		const rows = await database.query(
			"INSERT INTO items (quantity, total, product_id, user_id) VALUES (?, ?, ?, ?)",
			[quantity, total, product_id, user_id]
		);
		console.info("manager quantity", total);
		console.info("manager total", quantity);
		console.info("manager productId", product_id);
		console.info("manager userId", user_id);
		return rows[0];
	} catch (error) {
		console.info("manager catch", error);
		throw new Error("Error buying article", error);
	}
};

// const buyArticle = async (quantity, total, product_id, user_id) => {
// 	try {
// 		const query = `
//       INSERT INTO items (quantity, total, product_id, user_id)
//       VALUES (?, ?, ?, ?)
//       ON DUPLICATE KEY UPDATE
//       quantity = quantity + VALUES(quantity),
//       total = total + VALUES(total)
//     `;

// 		const [rows] = await database.query(query, [
// 			quantity,
// 			total,
// 			product_id,
// 			user_id,
// 		]);
// 		return rows[0];
// 	} catch (error) {
// 		console.info("buyArticle error", error);
// 		throw new Error("Error buying article", error);
// 	}
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

const getArticleByQuantityAndTotalPrice = async () => {
	try {
		const rows = await database.query(
			`SELECT users.email AS mail, products.name AS productName, items.quantity AS quantity, items.total AS totalPrice,
			FROM items
			JOIN users ON users.id = items.user_id
			JOIN products ON products.id = items.product_id
			WHERE users.id = 1
			GROUP BY products.name;`
		);
		return rows[0];
	} catch (error) {
		throw new Error("Error not article and price", error);
	}
};

module.exports = {
	getItems,
	getArticleTotalAndPriceTotal,
	getAllArticle,
	buyArticle,
	buyArticleUpdate,
	getArticleByQuantityAndTotalPrice,
};
