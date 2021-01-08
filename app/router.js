const express = require("express");
const router = express.Router();

const genericController = require("./controllers/genericController");

// router.get("/admin/:entity/number/:number", genericController.getAll);
router.get("/:entity", genericController.getAll);
router.get("/:entity/:name/:type", genericController.getOne);
router.post("/:entity", genericController.create);
router.patch("/:entity/:id", genericController.update);
router.delete("/:entity/:id", genericController.delete);

/* en dernier : la gestion des 404 */
router.use((req, res) => {
	res.status(404).send("Not found");
});

module.exports = router;
