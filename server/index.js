const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const compression = require("compression");
const port = 3000;
const db = require("./queries");

app.use(bodyParser.json());
app.use(compression());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Get review list
app.get("/:id/list", (request, response) => {
  let productId = request.params.id;
  db.getReviews(productId, request, response)
});

// // Get review list
// app.get("/:id/list", (request, response) => {
//     let productId = request.params.id;
//     db.getReviews((results) => response.status(200).json(results), productId);
//   });

// Get review meta data
app.get("/reviews/:product_id/meta", (request, response) => {
  let productId = request.params.product_id;
  db.getReviewMeta((results) => response.status(200).json(results), productId);
});

app.post("/reviews/:product_id", (request, response) => {
  let productId = request.params.product_id;
  let body = request.body;
  // console.log(body)
  db.addReview(productId, body, request, response);
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
