const Sequelize = require("sequelize");
const client = require("../db");

class Product extends Sequelize.Model {}

Product.init(
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

		picture: {
			type: Sequelize.TEXT,
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
		tea_variety_id: {
			type: Sequelize.INTEGER,
		},
		category_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		type_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
	},
	{
		sequelize: client,
		tableName: "product",
	}
);

module.exports = Product;
