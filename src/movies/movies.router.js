const router = require("express").Router();
const cors = require("cors");

const controller = require("./movies.controller");
const theatersRouter = require("../theaters/theaters.router");
const reviewsRouter = require("../reviews/reviews.router");

const methodNotAllowed = require("../errors/methodNotAllowed");


router.use(cors());

router
    .use("/:movieId/theaters", controller.movieIdExists, theatersRouter);

router
    .use("/:movieId/reviews", controller.movieIdExists, reviewsRouter);

router
    .route("/:movieId")
    .get(controller.read)
    .all(methodNotAllowed);

router
    .route("/")
    .get(controller.list)
    .all(methodNotAllowed);

module.exports = router;