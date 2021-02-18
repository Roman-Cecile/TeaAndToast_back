// on require les models
const { Basket, Product } = require("../models");
const models = require("../models");
// const { findAll } = require("../models/tea");
const pictureController = require("./pictureController");

// petite fonction bien pratique, pour passer la première lettre d'une string en majuscule
function uppercaseFirstLetter(str) {
	return str[0].toUpperCase() + str.slice(1);
}

const genericController = {
	getAll: async (req, res, next) => {
		try {
			const { entity, offset, productType } = req.params;

			let trueModelName;

			if (entity === "sub_category") {
				trueModelName = "SubCategory";
			} else {
				trueModelName = uppercaseFirstLetter(entity);
			}

			const targetClass = models[trueModelName];

			if (!targetClass) {
				return res.status(404).send({
					message: "Aucun résultat",
				});
			}

			let options = {
				include: [{ all: true, nested: true }],
			};

			if (entity === "product") {
				options = { ...options, limit: 5, offset };
			} else if (entity === "sub_category") {
				options = { ...options, where: { type: productType } };
			}
			const allResults = await targetClass.findAll(options);

			res.status(200).send({
				results: allResults,
			});
		} catch (error) {
			console.trace(error);
			res.status(500).send(error);
		}
	},

	// une méthode GET pour renvoyer une seul instance (ou 404 si non trouvée)
	getOne: async (req, res, next) => {
		try {
			const { entity, type, name } = req.params;
			// d'abord récupérer la classe ciblée
			const trueModelName = uppercaseFirstLetter(entity);
			const targetClass = models[trueModelName];

			if (!targetClass) {
				// si la classe ciblée n'exite pas => 404
				return res.status(404).send({
					message: "Aucune class ne correspond",
				});
			}

			// on a la bonne classe => on va chercher l'instance
			const result = await targetClass.findOne({
				where: {
					[type]: name, // userId or objectName
				},
				include: [{ all: true, nested: true }],
			});

			if (!result) {
				// si l'instance demandée n'existe pas => 404
				return res.status(404).send({
					message: "Aucun résultat",
				});
			}

			// tout va bien => on renvoie l'instance
			res.status(200).send({
				result: result,
			});
		} catch (error) {
			console.trace(error);
			res.status(500).send(error);
		}
	},

	create: async (req, res, next) => {
		try {
			const { name } = req.body;
			const { entity } = req.params;

			let trueModelName;

			if (entity === "sub_category") {
				trueModelName = "SubCategory";
			} else {
				trueModelName = uppercaseFirstLetter(entity);
			}

			const targetClass = models[trueModelName];

			if (!targetClass) {
				// si la classe ciblée n'exite pas => 404
				return res.status(404).send({
					message: "Aucun résultat",
				});
			}

			// Check if name or email is already exist
			const isExist = await targetClass.findOne({
				where: {
					name,
				},
			});

			if (isExist) {
				return res.status(403).send({
					message: `${name} est déjà utilisé`,
				});
			}

			// ATTENTION : ceci n'est possible QUE parcequ'on a pris le temps de définir des modèles avec une validation !!
			const newResult = await targetClass.create(req.body);

			if (trueModelName === "Product") {
				// await pictureController.createPicture(req, res);
				//! vérifier si on récupère l'objet à jour avec la photo
			}

			// on renvoie l'instance nouvellement créée
			res.status(200).send({
				newResult,
			});
		} catch (error) {
			console.trace(error);
			res.status(500).send(error);
		}
	},

	// une méthode PATCH pour modifier une instance (ou 404 si non trouvée)
	update: async (req, res, next) => {
		try {
			const { emailOrName } = req.body;
			const { entity, id } = req.params;

			// Upper case first letter of entity according to model name
			const trueModelName = uppercaseFirstLetter(entity);

			// Search model
			// entity = foo and trueModelName = Foo
			const targetClass = models[trueModelName];

			if (!targetClass) {
				// if model doesnt exist => 404
				return res.sendStatus(404);
			}

			// Do not update any sale
			if (trueModelName === "Sale") {
				return res.status(403).send({
					message: "Vous ne pouvez pas modifier une facture",
				});
			}

			// Search the corresponding entity
			const targetInstance = await targetClass.findByPk(id);

			// If entity doesnt exist => 404
			if (!targetInstance) {
				return res.status(404).send({
					message: "Aucun résultat",
				});
			}

			// Check if name or email is already exist
			const isExist = await targetClass.findOne({
				where: {
					[emailOrName]: req.body[emailOrName],
				},
			});

			// If exist stop update
			if (isExist) {
				return res.status(403).send({
					message: `${req.body[emailOrName]} est déjà utilisé`,
				});
			}

			// sinon, on met tout à jour, et on renvoie le résultat
			await targetInstance.update(req.body);

			res.status(200).send({
				[entity]: targetInstance,
			});
		} catch (error) {
			console.trace(error);
			res.status(500).send(error);
		}
	},

	// une methode DELETE pour supprimer une instance (ou 404 si non trouvée)
	delete: async (req, res, next) => {
		try {
			// delete session
			if (req.params.entity === "user") {
				delete req.session.user;
				return res.sendStatus(200);
			}
			// d'abord récupérer la classe ciblée
			const trueModelName = uppercaseFirstLetter(req.params.entity);
			const targetClass = models[trueModelName];

			if (!targetClass) {
				// si la classe ciblée n'exite pas => 404
				return next();
			}

			// ensuite, on va chercher l'instance ciblée
			const targetId = req.params.id;
			const targetInstance = await targetClass.findByPk(targetId);

			// si elle existe pas => 404
			if (!targetInstance) {
				return res.status(404).send({
					message: "Aucun résultat",
				});
			}

			// si tout est ok, on supprime et on renvoie "ok"
			await targetInstance.destroy();

			res.status(200).send({
				message: "Element supprimé",
			});
		} catch (error) {
			console.trace(error);
			res.status(500).send(error);
		}
	},
};

module.exports = genericController;
