const Pool = require("pg").Pool;
require('dotenv').config();
require('newrelic');

const pool = new Pool({
  user: process.env.POOL_USER,
  host: process.env.POOL_HOST,
  database: process.env.POOL_DATABASE,
  password: process.env.POOL_PASSWORD,
  port: process.env.POOL_PORT, // may need to change this when deployed
});

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});


const getReviews = (id, request, response) => {
  pool
    .query(
      "SELECT reviews.id, reviews.rating, reviews.date, reviews.summary, reviews.recommend, reviews.reported, reviews.reviewer_name, reviews.reviewer_email, reviews.response, reviews.helpfulness, ARRAY_AGG (reviews_photos.url) FROM reviews LEFT JOIN reviews_photos ON reviews.id = reviews_photos.review_id WHERE product_id = $1 GROUP BY (reviews.id)",
      [id]
    )
    .then((data) => {
      let results = data.rows;
      for (let i = 0; i < results.length; i++) {
        let value = results[i]['array_agg']
        results[i]["photos"] = value;
        delete results[i]["array_agg"]
      }
      return data.rows;
    })
    .then((reviews) => response.send({ product: `${id}`, count: reviews.length, results: reviews }))
    .catch((error) => console.log(error));
};

// SELECT * FROM reviews INNER JOIN reviews_photos ON reviews_photos.review_id = reviews.review_id WHERE product_id = x

const getReviewMeta = (cb, id) => {
  pool.query(
    "SELECT * FROM characteristics WHERE product_id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      cb({ product_id: `${id}`, results: results.rows }); // create object here
    }
  );
};

const addReview = (id, body, request, response) => {
  let itemArr = [
    id,
    body.rating,
    body.summary,
    body.body,
    body.recommend,
    false,
    body.name,
    body.email,
    null,
    null,
  ];

  pool.query(
    "INSERT INTO REVIEWS (product_id, rating, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
    [
      id,
      body.rating,
      body.summary,
      body.body,
      body.recommend,
      false,
      body.name,
      body.email,
      null,
      null,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Review added`);
    }
  );
};

module.exports = { getReviews, getReviewMeta, addReview }; // add functions here when complete
