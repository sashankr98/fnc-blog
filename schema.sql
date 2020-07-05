CREATE TABLE test (
    id SERIAL PRIMARY KEY,
    msg VARCHAR(255)
);

CREATE TABLE posts (
  pid SERIAL PRIMARY KEY,
  title VARCHAR(255),
  body VARCHAR,
  date_created TIMESTAMP
);