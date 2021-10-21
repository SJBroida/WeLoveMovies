const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

// This function adds the details of the critic to the review
// as a nested object.

const addCritic = reduceProperties("review_id", {
    critic_id: ["critic", null, "critic_id"],
    preferred_name: ["critic", null, "preferred_name"],
    surname: ["critic", null, "surname"],
    organization_name: ["critic", null, "organization_name"],
});

const addCriticNoId = reduceProperties("review_id", {
    preferred_name: ["critic", null, "preferred_name"],
    surname: ["critic", null, "surname"],
    organization_name: ["critic", null, "organization_name"],
});

function destroy(review_id) {
    return knex("reviews")
        .where({ review_id })
        .del();
}

// This function finds a specific review_id 
// and returns the review object with nested critic object.
function findReview(review_id) {
    return knex("reviews")
        .select("*")
        .where({ review_id })
        .first();
}

function pullReview(review_id) {
    return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({ "r.review_id": review_id})
    .then(addCriticNoId)
    .then((reviews) => {
      return reviews.map((review) => {
        review.critic = review.critic[0];
        return review;
      });
    })
}

function read(movie_id) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({ "r.movie_id": movie_id})
    .then(addCritic)
    .then((reviews) => {
      return reviews.map((review) => {
        review.critic = review.critic[0];
        return review;
      });
    });
}

function update(updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ "review_id": updatedReview.review_id })
    .update({...updatedReview});
}

module.exports = {
    destroy,
    findReview,
    pullReview,
    read,
    update,
};