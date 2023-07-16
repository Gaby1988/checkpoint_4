const { findByEmail } = require("../models/ConnexionManager");

const verifyUsers = async (req, res) => {
	try {
		const [existingUser] = await findByEmail(req.body.email);
		if (!existingUser) {
			res.status(403).json({ message: "Email ou mot de passe incorrect" });
		}
	} catch (err) {
		res.status(500).send(err);
	}
};

module.exports = {
	verifyUsers,
};
