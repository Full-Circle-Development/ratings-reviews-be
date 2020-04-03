DROP DATABASE IF EXISTS reviewsdb;

CREATE DATABASE reviewsdb;
  
\c reviewsdb;
  
  CREATE TABLE reviews (
      id SERIAL,
      product_id INTEGER,
      rating INTEGER,
      date DATE NOT NULL,
      summary TEXT, 
      body TEXT,
      recommend BOOLEAN,
      reported BOOLEAN, 
      reviewer_name VARCHAR NOT NULL,
      reviewer_email VARCHAR NOT NULL,
      response TEXT,
      helpfulness INTEGER
  );
-- From mock data: id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness
-- Example: 1,1,5,"2019-01-01","This product was great!","I really did or did not like this product based on whether it was sustainably sourced.  Then I found out that its made from nothing at all.",true,false,"funtime","first.last@gmail.com",,8


  CREATE TABLE reviews_photos (
      id SERIAL,
      review_id INTEGER references reviews(id),
      url VARCHAR
  );
-- From mock data: id,review_id,url
-- Example: 1,5,"https://images.unsplash.com/photo-1560570803-7474c0f9af99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80"


  CREATE TABLE characteristics ( 
      id SERIAL,
      product_id INTEGER,
      name VARCHAR
  );
-- id,product_id,name
-- example: 1,1,"Fit"


  CREATE TABLE characteristics_reviews (
      id SERIAL,
      characteristic_id INTEGER references characteristics(id),
      review_id INTEGER references reviews(id),
      value INTEGER
  );
-- id,characteristic_id,review_id,value
-- example: 1,1,1,4