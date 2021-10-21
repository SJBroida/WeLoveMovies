const service = require("./movies.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieIdExists(req, res, next) {

    const { movieId } = req.params;
    const movie = await service.read(movieId);
    if (movie) {
        res.locals.movie = movie;
        return next();
    }
    return next({ status: 404, message: `Movie cannot be found.`})
}

async function list(req, res) {
    // Check and see if the Query Parameter "is_showing" is present and if it's true.
    const is_showing = req.query.is_showing;
    // Create an empty array to store the array obtained from the service
    let data = [];
    // Depending if is_showing is true, call specific list functions from service.
    if(is_showing) {
        data = await service.listShowing();
    } else {
        data = await service.list();
    }
    res.json({ data });
}

async function read(req, res) {
    res.json({ data: res.locals.movie });
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(movieIdExists), asyncErrorBoundary(read)],
    movieIdExists,
};