### Description
Duration: 2 Week Sprint

I find the process of locating and keeping track of interesting concerts nearby to be a bit tedious at times. Many times, I find myself having to sift through various social media platforms, venue websites or adversizements to finally find a show I would want to attend. I would prefer to have a singular tool that allows me to find and save concerts I would want to attend in the near future.

"Where At?" is a concert finder application that aims to fullfill this need. Users are able to perform searches of iconic Minneapolis concert venues within specified date ranges. Upon a search, a user is navigated to a search results page which provides a list of events which is provided by the Songkick API. If any shows on this results page sparks interest, a user can click to see more concert details and can navigate to a details page for that specific show. If this selected show is appealling enough, the user can save this show to a database for long-term storage and can navigate to a final review page, which displays a table of all their saved shows. Here, the user can make any finalized decisions, either buy tickets to a show or delete a show that they no longer need to keep track of.

To see the fully functional site, please visit: (https://where-at-application-2021.herokuapp.com/)

### Screen Shot
- [Login Page](public/images/LoginPage.jpg)
- [Register Page](public/images/RegisterPage.jpg)
- [Search Page](public/images/SearchPage.jpg)
- [Search Results](public/images/SearchResults.jpg)
- [Concert Details](public/images/ConcertDetails.jpg)
- [User Concerts](public/images/UserConcerts.jpg)

### Technologies
This version uses React, Redux-Sagas, Express, Passport, PostgreSQL, Material UI, and the Songkick API. 
(a full list of dependencies can be found in `package.json`).

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

### Development Setup Instructions

- Run `npm install`
- Create a `.env` file at the root of the project and paste this line into the file:
  ```
  SERVER_SESSION_SECRET=superDuperSecret
  ```
  While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
- Start postgres if not running already by using `brew services start postgresql`
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000`

## Create database and table

- Create a new database called `where_at` and create a `user` table:

```SQL
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
```
- The queries in the database.sql file are set up to create all the neccessary tables to allow this app to run correctly. The project is built on postgres, so that will need to be installed. We recommend using Postico to run those queries as that is what I utilized to create these queries

### Usage
- Register for secure access if you do not have an account already
- Log in
- On the search page, enter a venue name and a range of dates for potential shows
- Once on the search results page, find a show of interest and select the "view details" button
- On the concert details page, examine the information displayed and hit "save event"
- On the user events page, review the list of saved events and make any final decisions on which shows to attend
- Any events that are no longer of interest can be removed with the "delete" button
- Click "get tickets" link to navigate to an event page to see more information on the concert and purchase tickets
- Select the "Home" tab to navigate back to the search page and find another show

## Acknowledgement
Thanks to Prime Digital Academy for providing the tools and guidance to make this idea a reality. My instructor and the Proth Cohort were immensely supportive at every step of this process.

## Support
If you have any suggestions or issues, please email me at dannymussie7@gmail.com




