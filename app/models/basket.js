const Sequelize = require("sequelize");
const client = require("../db");

class Basket extends Sequelize.Model {}

Basket.init(
	{
		UserId: {
			type: Sequelize.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		teas: {
			type: Sequelize.ARRAY(Sequelize.DataTypes.INTEGER),
		},
	},
	{
		sequelize: client,
		tableName: "basket",
	}
);

module.exports = Basket;
