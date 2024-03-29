const Sequelize = require("sequelize");
const client = require("../db");

class User extends Sequelize.Model {}

User.init(
	{
		email: {
			type: Sequelize.TEXT,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		password: {
			type: Sequelize.TEXT,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		logged: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
	},
	{
		sequelize: client,
		tableName: "app_user",
	}
);

module.exports = User;
