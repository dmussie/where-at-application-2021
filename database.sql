
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


CREATE TABLE "events" (
    "id" SERIAL PRIMARY KEY,
    "displayName" VARCHAR (100) NOT NULL,
    "city" VARCHAR (100) NOT NULL,
    "time" TIME,
    "uri" VARCHAR (250) NOT NULL
);



CREATE TABLE "user_events" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"event_id" INT REFERENCES "events"
	ON DELETE CASCADE
);




