# NODE MUSICS - CHECKPOINT 3

## Disclaimer

The checkpoint is quite consequent, it's no big deal if you don't do everything before the deadline. Do your best, and most importantly HAVE FUN 😃

# The checkpoint itself 🔥

## :zero: Setup | 30 sec

Before starting anything technical, your first mission is to clone this project, then create a branch with your lastname and firstname like so : `lastname_firstname`

## :one: Step[1] - Database modeling | 20 min

We want to build a website that allows users to discover and share cooking recipes. Your mission here is to provide a **logical data model** that meets the following constraints for the application :

- Users must be able to identify themselves on the application with a username and password.
- Several recipes can exist for a specific dish. Each dish is defined by his name and his type (starter, main course or dessert)
- Each recipe is defined by : a title, an author, a date of creation, a list of ingredients and an ordered list of steps. A recipe is always related to a dish.
- For each recipe, we should be able to find the steps of the recipe as well as the order in which they need to be done.
- For a given recipe, for each ingredient we should be able to find the quantity and the unit.
- Finally, each user must be able to add a recipe to his favorites.

### To properly model your database :

- Start by identifying **entities** and defining their **relationships** (with cardinalities) through a **conceptual data model**. Use paper/pencil to draft this first model.
- On the basis of the previous model, design the **logical data model**
  by adding attributes, foreign keys and/or junction tables.

You can use the tool of your choice to produce the database model :

- ✏️ Paper and pencil (my recommendation)

- 🛠️ any diagram drawing applications like [Workbench](https://www.mysql.com/fr/products/workbench/), [Draw.io](https://app.diagrams.net/), [Google Drawings](https://chrome.google.com/webstore/detail/google-drawings/mkaakpdehdafacodkgkpghoibnmamcme/related?hl=fr)...

Once you're satisfied with your data model, take a picture, a screenshot or export as an image and commit it to your branch.

## :two: Step[2] - NodeJS / Express | 3 hours

### Getting started :point_down:

The project comes comes with ESLint and Prettier.

In the project directory, you can run different scripts:

- `npm run dev` : Runs the app in the development mode using `nodemon` on port 8000 by default. You can change it by creating a `PORT` variable in your `.env` file. (You should create this file)
- `npm start`: Runs the app in production mode. This will **not re-start when you write your code !**
- `npm run lint` : This app came with basic ESLint config (Prettier + React), you can run a check every time using this script. :collision: BEWARE :collision: If you don't have Prettier installed in your Editor with format on save, you should run it with the next script
- `npm run prettier` : It runs Prettier on all your staged files. (only useful if you don't have Prettier installed in your editor)
- `npm test -runInBand` : This is the most important command for this checkpoint. It will test your CRUDs with `jest`. More informations below.

---

**In this step, you will create an API that allows you to manage songs and albums using Node/Express**

_Please please, don't forget to make atomic commits with explicit messages_ :pray:

Here is the database schema you need to create beforehand.  
You can use either SQL database you like (MySQL, SQLite, Postgresql), but cannot use noSQL (MongoDB for example).
![](https://camo.githubusercontent.com/3c19127eade9d784c0060d3e2a4e7838e653a50bd576b9c7a0c4a7b0a0d8373d/68747470733a2f2f692e696d6775722e636f6d2f5a33444b5643542e706e67)
![](https://camo.githubusercontent.com/947c593bda05ee3591b2a5c387865e3b94f45f2eef165ff62bea9311e46dbfa6/68747470733a2f2f692e696d6775722e636f6d2f504473536f45432e706e67)

:warning: The keys name should be the same as the schema and case sensitive, otherwise integration tests will fail ! :warning:

_don't write `albumId` instead of `id_album` for example_.

---

### Rules

- :white_check_mark: Response bodies should be JSON.
- :white_check_mark: Request bodies should be JSON.
- :white_check_mark: `PUT` and `DELETE` request should return `204 no content`.
- :white_check_mark: Respect as much as you can REST practices
- :white_check_mark: `POST` request should return `201 created` with the associated created resource.
- :white_check_mark: Don't remove the `module.exports = app` in the `app.js` file. We need it for the tests !
- :white_check_mark: All routes should starts with `/api`

### Tests

This checkpoint comes with integration tests on most of the routes.

![](https://media.giphy.com/media/sECT307ocX509Gh9bI/giphy.gif)

- :loud_sound: GET `/api/tracks` - should return a JSON response - an array containing all the rows from the track table, and a status of 200.
- :loud_sound: GET `/api/tracks/:id` - should return a JSON response - an object containing the track with the given id. If no such track - respond with a 404 Status
- :loud_sound: POST `/api/tracks` - should create a new row in the table AND return the newly created track in a JSON response with status 201. Hint: INSERT INTO queries also return a result for the callback function we are using from mysql2
- :loud_sound: PUT `/api/tracks/:id` - should change the title only of a track with the given id and respond with a status of 204 - No Content.
- :loud_sound: DELETE `/api/tracks/:id` - should delete the track with the given id and respond with a status of 204 - No Content
- :headphones: GET `/api/albums` - should return a JSON response - an array containing all the rows from the album table and a status of 200.
- :headphones: GET `/api/albums/:id` - should return a JSON response - an object containing the album with a given id and a status of 200. If no such album found respond with a 404 status.
- :headphones: GET `/api/albums/:id/tracks` - should return a JSON response - an array containing all the tracks from an album with given id.
- :headphones: POST `/api/albums` - should create a new album in the table AND return the newly created album in a JSON response with status 201.
- :headphones: PUT `/api/albums/:id` - should change the title only of an album with given id and return a response with status 204 - No Content
- :headphones: DELETE `/api/albums/:id` - should delete the album with given id and return a response with status 204 - No Content.

:warning: Run the test suite after you're done with a route to check if it's working correctly.
:warning: You can inspect the tests to see what the intended response and status are

:warning: You **NEED** to have a track in your database with the `id` 1, and an album with the `id` 1.  
Otherwise, 3 tests are going to fail.

---

### Your mission

Here are some user stories about what you need to do:

- As a user, I need to be able to retrieve the full list of tracks
- As a user, I need to be able to retrieve one track by its ID
- As a user, I need to be able to create a new track
- As a user, I need to be able to update a track
- As a user, I need to be able to delete a track
- As a user, I need to be able to retrieve the full list of albums
- As a user, I need to be able to retrieve one album by its ID
- As a user, I need to be able to retrieve the tracks list of one album
- As a user, I need to be able to create a new album
- As a user, I need to be able to update an album
- As a user, I need to be able to delete an album

_Remember: for the tests to work properly, you need an `album` with id `1` and a track with id `1` in your DB !_

---
## It's done ! Congrats !

You can now chill :beers:

![](https://media.giphy.com/media/l0Iyl55kTeh71nTXy/giphy.gif)  
![](https://media.giphy.com/media/pHYaWbspekVsTKRFQT/giphy.gif)
