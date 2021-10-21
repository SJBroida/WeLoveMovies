const service = require("./theaters.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// The list function will either return all theaters with their selection of movies, or...
// filter the theaters depending on if the movieId is present.

async function list(req, res) {
    const { movieId } = req.params;
    const data = await service.list(movieId);
    res.json({ data });
}

module.exports = {
    list: asyncErrorBoundary(list),
};