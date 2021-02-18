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
const Session = require("./session");
const SubCategory = require("./sub_category");

// Category <-> Product
Category.hasMany(Product, {
	foreignKey: "category_id",
	as: "produts",
});

Product.belongsTo(Category, {
	foreignKey: "category_id",
	as: "category",
});

// SubCategory <-> Product
SubCategory.hasMany(Product, {
	foreignKey: "sub_category_id",
	as: "produts",
});

Product.belongsTo(SubCategory, {
	foreignKey: "sub_category_id",
	as: "sub_category",
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
	SubCategory,
	Sale,
	Basket,
	User,
	Product,
	Session,
};
