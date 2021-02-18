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
		quantity: {
			type: Sequelize.NUMBER,
			allowNull: false,
			defaultValue: 1,
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
		type: {
			type: Sequelize.TEXT,
			allowNull: false,
			defaultValue: "tea",
			validate: {
				notEmpty: true,
			},
		},
		sub_category_id: {
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
