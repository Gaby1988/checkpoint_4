require("dotenv").config();

const app = require("./src/app.js");

// eslint-disable-next-line no-undef
const port = parseInt(process.env.APP_PORT ?? "5000", 10);

app.listen(port, (err) => {
	if (err) {
		console.error("Something bad happened");
	} else {
		console.info(`Server is listening on ${port}`);
	}
});

const welcome = (req, res) => {
	res.send("Welcome to the last checkpoint");
};

app.get("/", welcome);
