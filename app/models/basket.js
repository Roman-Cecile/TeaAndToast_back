const Sequelize = require("sequelize");
const client = require("../db");

class Basket extends Sequelize.Model {}

Basket.init(
	{
		app_user_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		product_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
	},
	{
		sequelize: client,
		tableName: "basket",
	}
);

module.exports = Basket;
