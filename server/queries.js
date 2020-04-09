const Pool = require("pg").Pool;

const pool = new Pool({
  user: "austin",
  host: "localhost",
  database: "reviewsdb",
  password: "123",
  port: 5432, // may need to change this when deployed
});

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

const getReviews = (cb, id) => {
  pool.query(
    "SELECT * FROM reviews WHERE product_id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      cb({product: `${id}`, results: results.rows}); // create object here
    }
  );
};

const getReviewMeta = (cb, id) => {
  pool.query(
    "SELECT * FROM characteristics WHERE product_id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      cb({product_id: `${id}`, results: results.rows}); // create object here
    }
  );
};





module.exports = { getReviews, getReviewMeta }; // add functions here when complete
