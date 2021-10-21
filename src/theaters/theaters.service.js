const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

// function used to create a movies nested object to place into data 
// before passing it to the controller.

const reduceMovies = reduceProperties("theater_id", {
    movie_id: ["movies", null, "movie_id"],
    title: ["movies", null, "title"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
    rating: ["movies", null, "rating"],
    description: ["movies", null, "description"],
    image_url: ["movies", null, "image_url"],
});

function list(movieId) {

    if(movieId) {
      
        return knex("theaters as t")
            .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
            .select("t.*")
            .where({ "mt.movie_id": movieId});
      
    } else {
      
        return knex("theaters as t")    
            .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
            .join("movies as m", "mt.movie_id", "m.movie_id")
            .select("t.*", "m.*", "mt.is_showing")
            .then(reduceMovies);
      
    }

}
  
module.exports = {
    list,
};