const Sequelize = require("sequelize");
const client = require("../db");

class Sale extends Sequelize.Model {}

Sale.init(
	{
		value: {
			type: Sequelize.FLOAT,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		email: {
			type: Sequelize.TEXT,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		address: {
			type: Sequelize.TEXT,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		city: {
			type: Sequelize.TEXT,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		zipCode: {
			type: Sequelize.TEXT,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		teas: {
			type: Sequelize.ARRAY(Sequelize.DataTypes.INTEGER),
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		app_user_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
	},
	{
		sequelize: client,
		tableName: "sale",
	}
);

module.exports = Sale;
