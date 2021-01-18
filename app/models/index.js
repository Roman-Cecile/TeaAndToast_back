/* SoC : le rôle de ce fichier est :
- 1: d'importer tous les modèles
- 2: définir les associations entre ces modèles
- 3: réexporter le tout !
*/

const Basket = require("./basket");
const Category = require("./category");
const Sale = require("./sale");
const Tea = require("./tea");
const User = require("./user");
const Variety = require("./variety");
const Session = require("./session");

// Category <-> Tea
Category.hasMany(Tea, {
	foreignKey: "category_id",
	as: "teas_category",
});

Tea.belongsTo(Category, {
	foreignKey: "category_id",
	as: "category",
});
// User <-> Sale
User.hasOne(Sale, {
	foreignKey: "app_user_id",
	as: "sale",
});

Sale.belongsTo(User, {
	foreignKey: "app_user_id",
	as: "buyer",
});

// Variety <-> Tea
Variety.hasMany(Tea, {
	foreignKey: "variety_id", // indique que Tea possède une colonne variety_id
	as: "teas_variety", // permet d'appeler les teas d'une Variété
});

Tea.belongsTo(Variety, {
	foreignKey: "variety_id",
	as: "variety",
});

// User <-> Basket
// User.hasOne(Basket);

// Basket.hasOne(User);

module.exports = {
	Category,
	Sale,
	Basket,
	User,
	Variety,
	Tea,
	Session,
};
