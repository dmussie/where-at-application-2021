## Description
Duration: 2 Week Sprint

I find the process of locating and keeping track of interesting concerts nearby to be a bit tedious at times. Many times, I find myself having to sift through various social media platforms, venue websites or adversizements to finally find a show I would want to attend. I would prefer to have a singular tool that allows me to find and save concerts I would want to attend in the near future.

"Where At?" is a concert finder application that aims to fullfill this need. Users are able to perform searches of iconic Minneapolis concert venues within specified date ranges. Upon a search, a user is navigated to a search results page which provides a list of events which is provided by the Songkick API. If any shows on this results page sparks interest, a user can click to see more concert details and can navigate to a details page for that specific show. If this selected show is appealling enough, the user can save this show to a database for long-term storage and can navigate to a final review page, which displays a table of all their saved shows. Here, the user can make any finalized decisions, either buy tickets to a show or delete a show that they no longer need to keep track of.

## Screen Shot
- [Login Page](public/images/LoginPage.jpg)
- [Register Page](public/images/RegisterPage.jpg)
- [Search Page](public/images/SearchPage.jpg)
- [Search Results](public/images/SearchResults.jpg)
- [Concert Details](public/images/ConcertDetails.jpg)
- [User Concerts](public/images/UserConcerts.jpg)

## Technologies
This version uses React, Redux-Sagas, Express, Passport, PostgreSQL, Material UI, and the Songkick API. 
(a full list of dependencies can be found in `package.json`).

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Development Setup Instructions

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
    "password" VARCHAR (1000) NOT NULL
);
```

## Debugging

To debug, you will need to run the client-side separately from the server. Start the client by running the command `npm run client`. Start the debugging server by selecting the Debug button.

![VSCode Toolbar](documentation/images/vscode-toolbar.png)

Then make sure `Launch Program` is selected from the dropdown, then click the green play arrow.

![VSCode Debug Bar](documentation/images/vscode-debug-bar.png)

## Testing Routes with Postman

To use Postman with this repo, you will need to set up requests in Postman to register a user and login a user at a minimum.

Keep in mind that once you using the login route, Postman will manage your session cookie for you just like a browser, ensuring it is sent with each subsequent request. If you delete the `localhost` cookie in Postman, it will effectively log you out.

1. Start the server - `npm run server`
2. Import the sample routes JSON file [v2](./PostmanPrimeSoloRoutesv2.json) by clicking `Import` in Postman. Select the file.
3. Click `Collections` and `Send` the following three calls in order:
   1. `POST /api/user/register` registers a new user, see body to change username/password
   2. `POST /api/user/login` will login a user, see body to change username/password
   3. `GET /api/user` will get user information, by default it's not very much

After running the login route above, you can try any other route you've created that requires a logged in user!

## Production Build

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

- Start postgres if not running already by using `brew services start postgresql`
- Run `npm start`
- Navigate to `localhost:5000`

## Lay of the Land

There are a few videos linked below that show a walkthrough the client and sever setup to help acclimatize to the boilerplate. Please take some time to watch the videos in order to get a better understanding of what the boilerplate is like.

- [Initial Set](https://vimeo.com/453297271)
- [Server Walkthrough](https://vimeo.com/453297212)
- [Client Walkthrough](https://vimeo.com/453297124)

Directory Structure:

- `src/` contains the React application
- `public/` contains static assets for the client-side
- `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site
- `server/` contains the Express App

This code is also heavily commented. We recommend reading through the comments, getting a lay of the land, and becoming comfortable with how the code works before you start making too many changes. If you're wondering where to start, consider reading through component file comments in the following order:

- src/components
  - App/App
  - Footer/Footer
  - Nav/Nav
  - AboutPage/AboutPage
  - InfoPage/InfoPage
  - UserPage/UserPage
  - LoginPage/LoginPage
  - RegisterPage/RegisterPage
  - LogOutButton/LogOutButton
  - ProtectedRoute/ProtectedRoute

## Deployment

1. Create a new Heroku project
1. Link the Heroku project to the project GitHub Repo
1. Create an Heroku Postgres database
1. Connect to the Heroku Postgres database from Postico
1. Create the necessary tables
1. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security
1. In the deploy section, select manual deploy

## Update Documentation

Customize this ReadMe and the code comments in this project to read less like a starter repo and more like a project. Here is an example: https://gist.github.com/PurpleBooth/109311bb0361f32d87a2


## Checklist

# Get started
[x] - Create a new database called `where_at` and create a `user` table:
[x] - Create rest of tables for project
[x] - Update user router to account for additional registration information
[x] - Check if user routes have been established
[x] - Check if user authentication is properly established


# Concert/Venue Search Route
[x] - create concert.router.js
  [x] - link songkick api
  [x] - create router.get
  [x] - create router.delete
  [] - create router.put?
[x] - save local Twin Cities venues to table
  [x] - columns: id, songkick_id, venue_name
  [x] - input data based on venue query searches and pulling songkick id's
[] - create concerts.sagas.js
[] - create concerts.reducer.js
[x] - create SearchConcerts folder and file
[x] - create SearchResults folder and file
[x] - create ConcertDetails folder and file
[x] - create ConcertReview folder and file

# Stretch Goal Favorite Artists
[] - Create favoriteArtists.router.js
  [] - create router.post
  [] - create router.get
  [] - create router.delete
[] - Create favorites.saga.js
[] - Create favorites.reducer.js
[] - Create FavoriteArtist folder and file

# Stretch Miscelaneous Features
[x] - Event URL enable click action and navigation to event page
[] - Link Spotify to Sign Up page
  [] - linked users can bypass search page and navigate to results based on Spotify interests
[] - Display map of concerts search page
[] - Material UI styling