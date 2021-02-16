const express = require("express");
const router = express.Router();

const genericController = require("./controllers/genericController");
const basketController = require("./controllers/basketController");
const loginController = require("./controllers/loginController");

// Login
// loginType = "signin" || "signup"
router.post("/login/:loginType", loginController.login);
router.get("/check-login", loginController.checkLogin);
router.get("/logout", loginController.logOut);
router.patch("/user/:id", loginController.update);
router.delete("/delete/user/:id", loginController.delete);

// basket
router.get("/basket/:userId", basketController.allProductsInBasket);
router.post("/basket/:userId/:productId/:productQuantity", basketController.create);
router.delete("/basket/:userId/:deleteType", basketController.delete);

// router.get("/admin/:entity/number/:number", genericController.getAll);
router.get("/:entity", genericController.getAll);
// entity = talbe name
// name = value of object
// type = name, email or id
router.get("/:entity/:name/:type", genericController.getOne);
router.post("/:entity", genericController.create);
router.patch("/update/:entity/:id", genericController.update);
router.delete("/:entity/:id", genericController.delete);

/* en dernier : la gestion des 404 */
router.use((req, res) => {
	res.status(404).send("Not found");
});

module.exports = router;
