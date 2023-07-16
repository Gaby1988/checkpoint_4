const database = require("../../database.js");

const createUser = async (register) => {
	const { email, hashedPassword } = register;

	const query = "INSERT INTO users ( email, hashedPassword) VALUES (?,?)";

	const values = [email, hashedPassword];

	try {
		const RegisterResult = await database.query(query, values);

		const updateUserRoleQuery = "UPDATE users SET role_id = 1 WHERE id = ?";
		await database.query(updateUserRoleQuery, [RegisterResult[0].insertId]);

		return {
			id: RegisterResult[0].insertId,
			email,
			hashedPassword,
		};
	} catch (error) {
		throw new Error("Error creating your profil");
	}
};

const getAll = async () => {
	try {
		const user = await database.query("SELECT * from users");
		console.info("manager");
		return user[0];
	} catch (error) {
		console.info("manager");
		throw new Error("Error retrieving formations");
	}
};

const findOne = async (email) => {
	const query = "SELECT * FROM users WHERE email = ? ";

	try {
		const [user] = await database.query(query, [email]);
		console.info(user);
		return user;
	} catch (error) {
		throw new Error("Error finding user");
	}
};

module.exports = {
	createUser,
	getAll,
	findOne,
};
