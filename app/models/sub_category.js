const Sequelize = require("sequelize");
const client = require("../db");

class SubCategory extends Sequelize.Model {}

SubCategory.init(
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
		type: {
			type: Sequelize.TEXT,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
	},
	{
		sequelize: client,
		tableName: "sub_category",
	}
);

module.exports = SubCategory;
