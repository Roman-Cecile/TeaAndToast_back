const Sequelize = require("sequelize");
const client = require("../db");

class Variety extends Sequelize.Model {}

Variety.init(
	{
		name: {
			type: Sequelize.TEXT,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		color: {
			type: Sequelize.TEXT,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
	},
	{
		sequelize: client,
		tableName: "variety",
	}
);

module.exports = Variety;
