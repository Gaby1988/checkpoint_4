const { body, validationResult } = require("express-validator");

const validateRegistration = [
	body("email").notEmpty().isEmail().isLength({ max: 255 }),
	body("hashedPassword").notEmpty().isLength({ max: 255 }),

	(req, res, next) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			res.status(422).json({ validationErrors: errors.array() });
		} else {
			next();
		}
	},
];

module.exports = {
	validateRegistration,
};
