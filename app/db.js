// SoC : ce fichier définit et exporte une connexion à la BDD façon sequelize
const Sequelize = require("sequelize");

const client = new Sequelize(process.env.DATABASE_URL, {
	logging: false, // (mettre à false pour enlever les logs de Sequelize)
	dialect: "postgres",
	protocol: "postgres",
});

// async function testConnection  () {
// 	try {
// 	await sequelize.authenticate();
// 	console.info("Connection has been established successfully.");
// 	console.info("Connection has been established successfully.");
// } catch (error) {
// 	console.error("Unable to connect to the database:", error);
// 	console.log("Unable to connect to the database:", error);
// 	console.info("Unable to connect to the database:", error);
// }
// }

module.exports = client;
