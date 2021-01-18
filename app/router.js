const express = require("express");
const router = express.Router();

const genericController = require("./controllers/genericController");
const loginController = require("./controllers/loginController");

// Login
// loginType = "signin" || "signup"
router.post("/login/:loginType", loginController.login);
router.get("/check-login", loginController.checkLogin);
router.get("/logout", loginController.logOut);

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
