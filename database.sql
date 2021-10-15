
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "first_name" VARCHAR (100),
    "last_name" VARCHAR (100),
    "email" VARCHAR (100),
    "city" VARCHAR (100),
    "state" VARCHAR (100),
    "zip" INT
);

CREATE TABLE "venues" (
    "id" SERIAL PRIMARY KEY,
    "venue" VARCHAR (80) NOT NULL,
    "street" VARCHAR (80) NOT NULL,
    "city" VARCHAR (80) NOT NULL,
    "state" VARCHAR (80) NOT NULL,
    "zip" INT NOT NULL
);

CREATE TABLE "dates" (
    "id" SERIAL PRIMARY KEY,
    "date" DATE NOT NULL,
    "time" TIME 
);

CREATE TABLE "artists" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (100) NOT NULL 
);

CREATE TABLE "user_events" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT,
	"date_id" INT,
	"venue_id" INT,
	"artist_id" INT
);

