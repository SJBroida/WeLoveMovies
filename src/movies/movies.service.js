const knex = require("../db/connection");

function list() {
    return knex("movies").select("*");
}

function listShowing() {
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .select("m.*")
        .distinct("m.movie_id")
        .where({ "mt.is_showing": true });
}

function read(movieId) {
    return knex("movies as m")
        .select("*")
        .where({ "m.movie_id": movieId })
        .first(); // Unwrap the array from the movie object.
}

module.exports = {
    list,
    listShowing,
    read,
};