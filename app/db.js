// SoC : ce fichier définit et exporte une connexion à la BDD façon sequelize
const Sequelize = require("sequelize");

const client = new Sequelize(process.env.DATABASE_URL, {
	logging: false, // (mettre à false pour enlever les logs de Sequelize)
	dialect: "postgres",
	protocol: "postgres",
});

module.exports = client;
