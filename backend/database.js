require("dotenv").config();
const mysql = require("mysql2/promise");

// Create a connection pool to the database

// eslint-disable-next-line no-undef
const { DB_HOST, DB_PORT, DB_USER, DB_NAME, DB_PASSWORD } = process.env;

const database = mysql.createPool({
	host: DB_HOST,
	port: DB_PORT,
	user: DB_USER,
	database: DB_NAME,
	password: DB_PASSWORD,
});

// Try a connection

database
	.getConnection()
	.then(() => {
		console.info("Connection to the database");
	})
	.catch((err) => {
		console.error(err);
	});

module.exports = database;
