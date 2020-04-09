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

const getReviews = (cb) => {
  // let id = parseInt(request.params.product_id); // I think this needs to be product_id, not 100% sure though

  pool.query(
    "SELECT * FROM reviews WHERE product_id = 1",
    (error, results) => {
      if (error) {
        throw error;
      }
      cb(results.rows); // create object here
    }
  );
};

// Demo route
// const getUserById = (request, response) => {
//   pool.query("SELECT * FROM reviews WHERE id = $1", [id], (error, results) => {
//     if (error) {
//       throw error;
//     }
//     response.status(200).json(results.rows);
//   });
// };

module.exports = { getReviews }; // add functions here when complete
