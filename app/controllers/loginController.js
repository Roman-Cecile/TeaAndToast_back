// on require les models
const { Basket, User, Session } = require("../models");
const bcrypt = require("bcrypt");

// petite fonction bien pratique, pour passer la première lettre d'une string en majuscule
function uppercaseFirstLetter(str) {
	return str[0].toUpperCase() + str.slice(1);
}

const loginController = {
	// Signin and Signup
	login: async (req, res, next) => {
		try {
			const { loginType } = req.params;
			const { email, password, confirmPassword } = req.body;

			const userIsExist = await User.findOne({
				where: {
					email: email,
				},
			});

			if (loginType === "signin" && !userIsExist) {
				return res.status(404).send({
					message: "Aucun utilisateur ne correspond",
				});
			}

			if (loginType === "signin") {
				const validPwd = await bcrypt.compareSync(password, userIsExist.password);

				if (!validPwd) {
					return res.status(400).send({
						message: "Email ou mot de passe incorrect",
					});
				}

				req.session.user = userIsExist;
				req.session.user.save();
				res.status(200).send({
					user: req.session.user,
				});
			} else {
				if (userIsExist) {
					return res.status(403).send({
						message: `${email} est déjà utilisé`,
					});
				}

				if (password !== confirmPassword) {
					return res.status(403).send({
						message: "La confirmation a échoué",
					});
				}

				const hashMdp = await bcrypt.hashSync(password, 10);

				// ATTENTION : ceci n'est possible QUE parcequ'on a pris le temps de définir des modèles avec une validation !!
				const newUser = await User.create({
					email: email,
					password: hashMdp,
					// role: data.email === process.env.ADMIN ? "admin" : "user",
				});

				const basket = await Basket.create({
					UserId: newUser.id,
				});

				await newUser.update({
					BasketId: basket.id,
				});
				// on renvoie l'instance nouvellement créée
				res.status(200).send({
					message: "Inscription réussie ! Vous pouvez vous connecter",
				});
			}
		} catch (error) {
			console.trace(error);
			res.status(500).send(error);
		}
	},

	// Check if session exist
	checkLogin: async (req, res, next) => {
		try {
			if (req.session.user) {
				return res.status(200).send({
					user: req.session.user,
				});
			}

			// equivalent to res.status(404).send('Not Found')
			res.sendStatus(404);
		} catch (error) {
			console.trace(error);
			res.status(500).send(error);
		}
	},

	logOut: async (req, res, next) => {
		try {
			if (req.session.user) {
				delete req.session.user;
				return res.sendStatus(200);
			}

			res.sendStatus(404);
		} catch (error) {
			console.trace(error);
			res.status(500).send(error);
		}
	},
};

module.exports = loginController;
