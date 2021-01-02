const Sequelize = require("sequelize");
const client = require("../db");

class Tea extends Sequelize.Model {}

Tea.init(
	{
		name: {
			type: Sequelize.TEXT,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		description: {
			type: Sequelize.TEXT,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		price: {
			type: Sequelize.FLOAT,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		available: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		variety_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		category_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
	},
	{
		sequelize: client,
		tableName: "tea",
	}
);

module.exports = Tea;
