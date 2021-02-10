// on require les models
const { Basket, Product } = require("../models");
const models = require("../models");
// const { findAll } = require("../models/tea");
const pictureController = require("./pictureController");

function uppercaseFirstLetter(str) {
	return str[0].toUpperCase() + str.slice(1);
}

const genericController = {
	allProductsInBasket: async (req, res, next) => {
		try {
			const baskets = await models.Basket.findAll({
				where: {
					app_user_id: req.params.userId,
				},
			});

			if (!baskets.length) {
				return res.sendStatus(404);
			}

			const productsId = [];
			baskets.map((basket) =>
				// get() catch all item properties
				Object.keys(basket.get()).map((key) => key === "product_id" && productsId.push(basket[key]))
			);

			const products = await models.Product.findAll({
				where: {
					id: productsId, // array
				},
			});

			// Search quantity of the same product in user basket
			let quantityProducts = {};
			baskets.forEach((product) => {
				quantityProducts[product.getDataValue("product_id")] =
					(quantityProducts[product.getDataValue("product_id")] || 0) + 1;
			});

			// Set new quantity property to product
			products.forEach((product) => {
				Object.keys(quantityProducts).map((productId) => {
					parseInt(productId, 10) === parseInt(product.getDataValue("id"), 10) &&
						product.setDataValue("quantity", parseInt(quantityProducts[productId], 10));
				});
			});

			res.status(200).send({
				products,
			});
		} catch (error) {
			console.trace(error);
			res.status(500).send(error);
		}
	},

	create: async (req, res, next) => {
		try {
			const { userId, productId, productQuantity } = req.params;

			// Check user in BDD
			const user = await models.User.findByPk(userId);
			if (!user) {
				return res.status(403).send({
					message: "Une erreur est survenue, cet utilisateur n'existe pas",
				});
			}

			// Check product in BDD
			const product = await models.Product.findByPk(productId);
			if (!product) {
				return res.status(403).send({
					message: "Une erreur est survenu, ce produit n'existe pas",
				});
			}

			// Create basket with productId according to quantity asked by user
			const quantity = parseInt(productQuantity, 10) > 1 ? parseInt(productQuantity, 10) : 1;
			for (let index = 0; index < quantity; index++) {
				await models.Basket.create({
					app_user_id: user.id,
					product_id: productId,
				});
			}

			// Set new quantity props to product
			product.setDataValue("quantity", quantity);

			return res.status(200).send({
				product,
			});
		} catch (error) {
			console.trace(error);
			res.status(500).send(error);
		}
	},

	// une methode DELETE pour supprimer une instance (ou 404 si non trouvée)
	delete: async (req, res, next) => {
		try {
			const { userId, deleteType } = req.params;
			const { productId } = req.body;

			// Check user in BDD
			const user = await models.User.findByPk(userId);
			if (!user) {
				return res.status(403).send({
					message: "Une erreur est survenue, cet utilisateur n'existe pas",
				});
			}

			// Delete one or more basket according to user demand
			if (deleteType === "product") {
				// Search all baskets with productId and userId
				const baskets = await models.Basket.findAll({
					where: {
						app_user_id: user.id,
						product_id: productId,
					},
				});

				if (!baskets.length) {
					return res.status(403).send({
						message: "Une erreur est survenue, ce produit dans votre panier n'existe pas",
					});
				}
				await baskets.forEach((basket) => basket.destroy());
			} else {
				// reduce quantity
				const basket = await models.Basket.findOne({
					where: {
						app_user_id: user.id,
						product_id: productId,
					},
				});
				if (!basket) {
					return res.status(403).send({
						message: "Une erreur est survenue, ce produit dans votre panier n'existe pas",
					});
				}
				await basket.destroy();
			}

			res.sendStatus(200);
		} catch (error) {
			console.trace(error);
			res.status(500).send(error);
		}
	},
};

module.exports = genericController;
