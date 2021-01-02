const s3Storage = require("multer-s3");
const models = require("../models");
// const aws = require("aws-sdk");

function uppercaseFirstLetter(str) {
	return str[0].toUpperCase() + str.slice(1);
	// Prend la première lettre de la chaine de caractère reçu en param
	// La met en majuscule
	// concatène le reste de la chaine de caractère (toujours en minuscule) avec cette lettre en maj
}

const pictureController = {
	getAll: async (req, res) => {
		try {
			const picture = models["Picture"];
			const allPictures = await picture.findAll({
				include: [
					{
						all: true,
						nested: true,
					},
				],
			});

			if (allPictures.length) {
				return res.status(200).send({
					picture: allPictures,
				});
			}

			return res.status(404).send({
				message: "Il n'y a aucune photo",
			});
		} catch (error) {
			console.trace(error);
			res.status(500).send({
				error,
			});
		}
	},

	getOne: async (req, res) => {
		try {
			const { id } = req.params.id;
			const picture = models["Picture"];

			const targetPicture = await picture.findByPk(id, {
				include: [
					{
						all: true,
						nested: true,
					},
				],
			});

			if (!targetPicture) {
				return res.status(404).send({
					message: "Aucune photo ne correspond",
				});
			}

			res.status(200).send({
				picture: targetPicture,
			});
		} catch (error) {
			console.trace(error);
			res.status(500).send({
				error,
			});
		}
	},

	deletePicture: async (req, res) => {
		try {
			const { id, entity } = req.params;
			// const picture = models["Picture"];

			// Meal or Restaurant
			const modelName = uppercaseFirstLetter(entity);
			const targetClass = models[modelName];

			// Looking for target table
			const target = await targetClass.findByPk(id);

			if (!target) {
				return res.status(404).send({
					message: "Ce thé n'existe pas",
				});
			}

			// if (target.pictureName) {
			// 	const s3 = new aws.S3();
			// 	const params = {
			// 		Bucket: "lacartesvp",
			// 		Delete: {
			// 			// required
			// 			Objects: [
			// 				// required
			// 				{
			// 					Key: target.pictureName, // required
			// 				},
			// 			],
			// 		},
			// 	};
			// 	await s3.deleteObjects(params, function (err, data) {
			// 		if (err) console.log(err, err.stack);
			// 		// an error occurred
			// 		else console.log(data); // successful response
			// 	});
			// 	await targetFile.destroy();
			// 	await target.reload();
			// 	return res.status(200).send({
			// 		message: "Photo supprimée",
			// 		entity: target,
			// 	});
			// }

			res.status(404).send({
				message: "Photo non trouvée",
			});
		} catch (error) {
			console.trace(error);
			res.status(500).send({
				error,
			});
		}
	},

	createPicture: async (req, res) => {
		try {
			const { id, entity } = req.params;

			// tea to Tea
			const modelName = uppercaseFirstLetter(entity);
			const targetClass = models[modelName];

			// const picture = models["Picture"];

			console.log("req.file !!!!!!", req.file);

			// Looking for target table

			const target = await targetClass.findByPk(id);

			if (!target) {
				return res.status(404).send({
					message: "Ce thé n'existe pas",
				});
			}

			const data = req.file.originalname;
			const name = data.toLowerCase();

			await target.update({
				picturePath: req.file.location,
				pictureName: name,
			});

			await target.reload();
			// req.file.target = target;
		} catch (error) {
			console.trace(error);
			res.status(500).send({
				error,
			});
		}
	},
};

module.exports = pictureController;
