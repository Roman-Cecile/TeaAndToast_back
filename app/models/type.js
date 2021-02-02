const Sequelize = require("sequelize");
const client = require("../db");

class Type extends Sequelize.Model {}

Type.init(
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
		tableName: "type",
	}
);

module.exports = Type;
