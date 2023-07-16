const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { findByEmail } = require("../models/ConnexionManager");

const hashingOptions = {
	type: argon2.argon2id,
	memoryCost: 2 ** 16,
	timeCost: 5,
	parallelism: 1,
};

const verifyPassword = async (req, res, next) => {
	const { email, password } = req.body;

	try {
		const [user] = await findByEmail(email);
		const response = await argon2.verify(
			user.hashedPassword,
			password,
			hashingOptions
		);
		if (response) {
			const token = await jwt.sign(
				{
					sub: req.body.id,
					userId: user.id,
				},
				// eslint-disable-next-line no-undef
				process.env.JWT_SECRET
			);
			res.status(200).send(token);
		}
	} catch (err) {
		console.error(err);
	}
	next();
};

module.exports = {
	verifyPassword,
};
