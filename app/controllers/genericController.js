// on require les models
const { Basket } = require("../models");
const models = require("../models");
const pictureController = require("./pictureController");

// petite fonction bien pratique, pour passer la première lettre d'une string en majuscule
function uppercaseFirstLetter(str) {
	return str[0].toUpperCase() + str.slice(1);
}

const genericController = {
	// une méthode GET pour renvoyer toutes les instances
	getAll: async (req, res, next) => {
		try {
			// on récupère  le modèle ciblée (="l'entité") dans les paramètres d'url
			const targetModel = req.params.entity;

			// il faut récupérer la vrai class Model à partir du nom de l'entité ciblée
			// exemple : la route "/list" nous donne le paramètre "list" alors que le model s'appelle List  => il faut passer la première en majuscule !
			const trueModelName = uppercaseFirstLetter(targetModel);

			// maintenant qu'on a le nom du modèle, on veut LE modele, le vrai !
			// on utilise la bracket-notation :
			//  si trueModelName vaut "List",
			//  alors models[trueModelName] revient à écrire models["List"]
			//  ce qui équivaut à écrire models.List, et bingo (twingo?), ça c'est notre classe
			const targetClass = models[trueModelName];

			// petit test : on vérifie que la classe visée existe bien, sinon 404
			if (!targetClass) {
				return res.status(404).send({
					message: "Aucun résultat",
				});
			}

			// maintenant qu'on a la bonne classe, on va chercher toutes les instances !

			// UPDATE pour les positions :
			// on met les options de requetes dans un objet
			const options = {
				include: [{ all: true, nested: true }],
			};

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
			// d'abord récupérer la classe ciblée
			const trueModelName = uppercaseFirstLetter(req.params.entity);
			const targetClass = models[trueModelName];

			if (!targetClass) {
				// si la classe ciblée n'exite pas => 404
				return res.status(404).send({
					message: "Aucune class ne correspond",
				});
			}

			// on a la bonne classe => on va chercher l'instance
			const targetId = req.params.id;
			const result = await targetClass.findOne({
				where: {
					[req.params.type]: req.params.name, // userId or objectName
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
				result,
			});
		} catch (error) {
			console.trace(error);
			res.status(500).send(error);
		}
	},

	create: async (req, res, next) => {
		try {
			const { emailOrName } = req.body;
			// d'abord récupérer la classe ciblée
			const trueModelName = uppercaseFirstLetter(req.params.entity);
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
					[emailOrName]: req.body[emailOrName],
				},
			});

			if (isExist) {
				return res.status(403).send({
					message: `${req.body[emailOrName]} est déjà utilisé`,
				});
			}

			// ATTENTION : ceci n'est possible QUE parcequ'on a pris le temps de définir des modèles avec une validation !!
			const newResult = await targetClass.create(req.body);

			if (trueModelName === "Tea") {
				// await pictureController.createPicture(req, res);
				//! vérifier si on récupère l'objet à jour avec la photo
			}

			if (trueModelName === "User") {
				const basket = await models["Basket"].create({
					UserId: newResult.id,
				});

				await newResult.update({
					BasketId: basket.id,
				});
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
			// d'abord récupérer la classe ciblée
			const trueModelName = uppercaseFirstLetter(req.params.entity);
			const targetClass = models[trueModelName];

			if (!targetClass) {
				// si la classe ciblée n'exite pas => 404
				return next();
			}

			if (trueModelName === "Sale") {
				return res.status(403).send({
					message: "Vous ne pouvez pas modifier une facture",
				});
			}

			// on a la bonne classe => on va chercher l'instance
			const targetId = req.params.id;
			const targetInstance = await targetClass.findByPk(targetId);

			// si l'instance n'existe pas => 404
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

			if (isExist) {
				return res.status(403).send({
					message: `${req.body[emailOrName]} est déjà utilisé`,
				});
			}

			if (trueModelName === "Basket") {
				const targetTea = await models["Tea"].findAll({
					where: {
						id: req.body.teas,
					},
				});

				if (targetTea.length !== req.body.teas.length) {
					return res.status(500).send({
						message: "Une erreur est survenue, ce thé n'existe pas",
					});
				}
			}

			// sinon, on met tout à jour, et on renvoie le résultat
			await targetInstance.update(req.body);

			res.status(200).send({
				[trueModelName]: targetInstance,
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
