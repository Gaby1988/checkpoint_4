const database = require("../../database");

const findByEmail = async (login) => {
	const query = `SELECT *
    FROM users
    WHERE email = ? `;

	try {
		const [user] = await database.query(query, login);
		return user;
	} catch (error) {
		throw new Error("Error finding user");
	}
};

module.exports = {
	findByEmail,
};
