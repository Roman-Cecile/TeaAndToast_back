require("dotenv").config();
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const router = require("./app/router");
const routerUpload = require("./app/routerUpload");
const multerS3 = require("multer-s3");
// const aws = require("aws-sdk");
const client = require("./app/db");
const express = require("express");
const app = express();
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

app.use(express.static(path.join(__dirname, "public")));
// recupérer les donnés dans le body (pour les requete POST et PATCH)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
	cors({
		allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
		credentials: true,
		methods: "GET, POST, PUT, PATCH, OPTIONS, DELETE",
		origin: process.env.URL_CORS,
	})
);

app.use(express.urlencoded({ extended: true }));
// on rajoute aussi multer pour les body au format "multipart"
const bodyParser = multer();
// on utlise .none() pour dire à multer qu'on attends pas de fichier, uniquement des inputs "classiques" !
app.use(bodyParser.none());

const extendDefaultFields = async (defaults, session) => {
	if (session.user) {
		return {
			data: defaults.data,
			expires: defaults.expires,
		};
	}
};

const store = new SequelizeStore({
	db: client,
	tableName: "session",
	extendDefaultFields: extendDefaultFields,
});

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		store,
		saveUninitialized: true,
		resave: false, // we support the touch method so per the express-session docs this should be set to false
		// proxy: false, // if you do SSL outside of node.
		expire: 5000 * 60 * 60,
		cookie: {
			secure: false,
			httpOnly: false,
			maxAge: 5000 * 60 * 60,
		},
	})
);

store.sync();

// aws.config.update({
// 	secretAccessKey: process.env.AWS_SECRET_ACCES_KEY,
// 	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
// 	region: "eu-west-3",
// });

// const s3 = new aws.S3();

// const upload = multer({
// 	// dest: path.join(`${__dirname}/uploads`),
// 	storage: multerS3({
// 		s3,
// 		acl: "public-read",
// 		contentType: multerS3.AUTO_CONTENT_TYPE,
// 		bucket: "teaAndToast2021", //! changer avant prod
// 		metadata: (req, file, cb) => {
// 			cb(null, { fieldName: file.fieldname });
// 		},
// 		key(req, file, cb) {
// 			const uniqueKey = Date.now().toString() + file.originalname;

// 			cb(null, uniqueKey); // use Date.now() for unique file keys
// 		},
// 	}),
// 	// storage: storage,
// 	limits: {
// 		fileSize: 10000000,
// 	},

// 	// dest: '/path/to/temporary/directory/to/store/uploaded/files',
// 	// you might also want to set some limits: https://github.com/expressjs/multer#limits
// });

// Morgan => donne de bonnes infos en console
const morgan = require("morgan");
app.use(morgan("dev"));

// n'accepte pas le multipart
// app.use(bodyParser.json())
// const body = multer()

// const body = multer({
//   dest: path.join(__dirname+'/uploads'),
// });

// app.use(upload.single("file"));

// brancher le router
app.use(routerUpload);
app.use(router);

// lancer l'écoute
const port = process.env.PORT || 5050;
app.listen(port, () => {
	console.log(`Listening on ${port}...`);
});
