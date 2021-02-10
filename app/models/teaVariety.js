const Sequelize = require("sequelize");
const client = require("../db");

class Tea_variety extends Sequelize.Model {}

Tea_variety.init(
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
		tableName: "tea_variety",
	}
);

module.exports = Tea_variety;
