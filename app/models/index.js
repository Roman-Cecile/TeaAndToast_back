/* SoC : le rôle de ce fichier est :
- 1: d'importer tous les modèles
- 2: définir les associations entre ces modèles
- 3: réexporter le tout !
*/

const Basket = require("./basket");
const Category = require("./category");
const Sale = require("./sale");
const Product = require("./product");
const User = require("./user");
const Tea_variety = require("./teaVariety");
const Session = require("./session");
const Type = require("./type");

// Category <-> Product
Category.hasMany(Product, {
	foreignKey: "category_id",
	as: "produts",
});

Product.belongsTo(Category, {
	foreignKey: "category_id",
	as: "category",
});

// Type <-> Product
Type.hasMany(Product, {
	foreignKey: "type_id",
	as: "produts",
});

Product.belongsTo(Type, {
	foreignKey: "type_id",
	as: "type",
});

// User <-> Sale
User.hasMany(Sale, {
	foreignKey: "app_user_id",
	as: "sales",
});

Sale.belongsTo(User, {
	foreignKey: "app_user_id",
	as: "buyer",
});

// Variety <-> Product
Tea_variety.hasMany(Product, {
	foreignKey: "tea_variety_id", // indique que Product possède une colonne tea_variety_id
	as: "products", // permet d'appeler les teas d'une Variété
});

Product.belongsTo(Tea_variety, {
	foreignKey: "tea_variety_id",
	as: "variety",
});

// User <-> Basket
User.hasMany(Basket, {
	foreignKey: "app_user_id",
	as: "baskets",
});

Basket.belongsTo(User, {
	foreignKey: "app_user_id",
	as: "user",
});

module.exports = {
	Category,
	Sale,
	Basket,
	User,
	Tea_variety,
	Product,
	Session,
	Type,
};
