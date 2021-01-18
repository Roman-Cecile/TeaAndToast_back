const Sequelize = require("sequelize");
const client = require("../db");

class Session extends Sequelize.Model {}

Session.init(
	{
		sid: {
			type: Sequelize.STRING,
			primaryKey: true,
		},
		userId: Sequelize.INTEGER,
		expires: Sequelize.DATE,
		data: Sequelize.TEXT,
	},
	{
		sequelize: client,
		tableName: "session",
	}
);

module.exports = Session;
