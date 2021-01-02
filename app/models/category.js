const Sequelize = require("sequelize");
const client = require("../db");

class Category extends Sequelize.Model {}

Category.init(
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
		tableName: "category",
	}
);

module.exports = Category;
