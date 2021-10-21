const service = require("./reviews.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
    const review = await service.findReview(req.params.reviewId);
    if (review) {
      res.locals.review = review;
      return next();
    }
    next({ status: 404, message: `Review cannot be found.` });
}

async function destroy(req, res) {
    const { review } = res.locals;
    await service.destroy(review.review_id);
    res.sendStatus(204);
}

async function read(req, res) {
    const { movieId } = req.params;
    const data = await service.read(movieId);
    res.json({ data });
}

async function update(req, res) {
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  await service.update(updatedReview);
  let data = await service.pullReview(updatedReview.review_id);
  data = data[0];
  res.json( {data} );
}

module.exports = {
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
    read: asyncErrorBoundary(read),
    update: [
        asyncErrorBoundary(reviewExists),
        asyncErrorBoundary(update),
    ],
};