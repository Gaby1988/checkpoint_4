const express = require("express");

const router = express.Router();
const registrationControllers = require("../controllers/registrationControllers");
const { hashPassword } = require("../middlewares/hashedPassword");
const { validateRegistration } = require("../validators/registrationValidator");

router.post(
	"/",
	hashPassword,
	validateRegistration,
	registrationControllers.postUsers
);
router.get("/", registrationControllers.getUsers);

module.exports = router;
