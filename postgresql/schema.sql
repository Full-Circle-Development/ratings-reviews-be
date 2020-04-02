
  CREATE TABLE reviews (
      id SERIAL,
      product_id (DO I NEED THIS???),
      rating INTEGER,
      date (type???),
      summary TEXT, 
      body TEXT,
      recommend INTEGER,
      reported INTEGER, 
      reviewer_name varchar,
      response TEXT,
      helpfulness INTEGER
  )

  CREATE TABLE reviews_photos (
      id SERIAL,
      review_id INTEGER references reviews(id),
      url VARCHAR
  )

  CREATE TABLE characteristics ( 
      id SERIAL,
      product_id (DO I NEED THIS???),
      name VARCHAR
  )

  CREATE TABLE characteristics_reviews (
      id SERIAL,
      character_id INTEGER references characteristics(id),
      review_id INTEGER references reviews(id),
      value VARCHAR
  )


/* maybe use SCHEMA here, maybe not? */ 