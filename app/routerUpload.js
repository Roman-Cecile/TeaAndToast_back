const express = require("express");

const routerUpload = express.Router();

const pictureController = require("./controllers/pictureController");

// ! modifier route
routerUpload.delete("/:entity/:id/:file/:fileId", pictureController.deletePicture);

routerUpload.get("/image", pictureController.getAll);
routerUpload.get("/image/:id", pictureController.getOne);

// Route dynamique pour créer une photo. Je récupère l'id d'un meal quand je créer une picture de meal et je récupère l'id de la ville quand je créer une picture de ville
routerUpload.post("/new/:entity/:id/:file", async (req, res, next) => {
	try {
		await pictureController.createPicture(req, res);

		if (req.file.target) {
			res.status(200).send({
				target: req.file.target,
			});
		}
	} catch (error) {
		console.trace(error);
		res.status(500).send(error);
	}
});

module.exports = routerUpload;
