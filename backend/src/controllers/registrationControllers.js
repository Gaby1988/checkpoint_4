const RegistrationManager = require("../models/RegistrationManager");

const postUsers = async (req, res) => {
	try {
		const [existingUser] = await RegistrationManager.findOne(req.body.email);
		if (!existingUser) {
			const userCreated = await RegistrationManager.createUser(req.body);
			res.status(200).json(userCreated);
		} else {
			res.status(404).json({
				message: "Adresse mail déjà utilisée!",
			});
		}
	} catch (err) {
		res.status(500).send(err);
	}
};

const getUsers = async (req, res) => {
	try {
		const user = await RegistrationManager.getAll();
		if (user.length === 0) {
			res.status(404).send("No user found");
			console.info("controller");
		} else {
			res.status(200).send(user);
		}
	} catch (err) {
		res.status(500).send(err);
	}
};

module.exports = {
	postUsers,
	getUsers,
};
