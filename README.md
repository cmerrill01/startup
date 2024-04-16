# startup

Access notes about things I learned this semester [here](notes.md).

## Startup Specification

### Elevator Pitch

EconoMentor gamifies essential concepts of economics to make them accessible to learners of all ages and backgrounds. The user operates a business in a simulated economic environment, learning to make decisions that optimize the business's performance. Individual learners and educational institutions alike will find EconoMentor an enjoyable way to learn how a market economy works.

### Key Features

- Secure login authentication over HTTPS
- Ability to start a new game, which includes the following features:
  - Generates a random demand curve
  - Generates a random fixed cost level and variable cost curve
  - Generates a recommended quantity range
- Display of key information during gameplay, including:
  - Current value of assets (current score)
  - Current month (round of the game)
  - Recommended quantity range
  - Fixed cost
  - Variable cost per unit produced
- User inputs for the following during gameplay:
  - Price
  - Quantity
- An option to submit price and quantity for each round of gameplay
- Display of results following each round's submission, including:
  - Total revenue
  - Total cost
  - Total profit
- Update current asset value (current score) after every round
- Final score persistently stored
- Post final score after twelve rounds to a personal scorecard and/or leaderboard

### How I Will Use Each Technology

Authentication:
- A user must register or login before creating a new game or viewing the leaderboard
- The following account data is persistently and securely stored in a database:
  - username
  - password

Database data:
- The database stores data from all current and completed games, including the following fields:
  - username
  - game_name
  - game_id
  - current_score
  - current_round
  - fixed_cost
  - variable_cost_per_unit
  - demand_curve_intercept
  - demand_curve_slope
- Users can view the following data for completed games (current_round = 13) on the leaderboard:
  - username
  - game_name
  - current_score

 Websocket data:
 - The application will use websocket to send the client the following information after each round of play:
   - Total revenue
   - Total cost
   - Total profit
   - Updated score

### Design Images

Demonstration of login user interface
![Image of login user interface with options to register a new account or login to a current account](/public/assets/images/economentor_login.PNG)

Demonstration of "How to Play" page
![Image of "How to Play" page](/public/assets/images/economentor_howtoplay.PNG)

Demonstration of gameplay user interface
![Image of gameplay user interface showing key information and providing input options and a "submit" button](/public/assets/images/economentor_gameplay.PNG)

Demonstration of leaderboard page
![Image of the leaderboard showing a table with the users and their high scores](/public/assets/images/economentor_leaderboard.PNG)

## HTML Deliverable

For this deliverable, I created the underlying structure of my web application using HTML.

- **HTML Pages:** The web application includes four web pages: first, the index.html page that serves as the home/login page; second, the instructions.html page that explains how to play the game; third, the gameplay.html page where game play takes place; and fourth, the scores.html page where users can view the five all-time highest scores
- **Links:** All pages are accessible via the navigation bar.
- **Textual Content:** Text is used in the How to Play page to explain how the application works
- **Images:** An image hosted in the server is shown on the How to Play page.
- **Login:** Forms are present for account creation and account login.
- **Name Display:** A placeholder for the user's username is shown in the navigation bar on the gameplay and scores pages.
- **Database Data Placeholder:** The table in the Scores page will pull data from the database
- **WebSocket Data Placeholder:** The table labeled "Currently Playing" on the gameplay page will show data pushed from the server regarding who is playing and what their score is.

## CSS Deliverable

For this deliverable, I styled my web application so that it has the appearance of the finished product.

- **Header, footer, and main content body:** The header and footer are a constant size, are anchored to the top and bottom of the screen, and disappear if the screen is too short. The main content body adjusts its layout depending on the size of the screen
- **Navigation elements:** I used and adjusted Bootstrap formatting for the navigation bar at the top of the screen.
- **Responsive layout:** The gameplay page adjusts its layout depending on the size of the screen
- **Application elements:** Used card-like formatting to enhance visibility of data the player will use for decision-making
- **Application text content:** Bootstrap default fonts throughout.
- **Application images:** The image of Adam Smith is contained in an aside element on the "How to Play" page.

## JavaScript Deliverable

For this deliverable, I used JavaScript to make my app interactive.

- **JavaScript support for future login:** My application will accept a submission of a username, password, and email (if applicable) from either the Login or Create Account section of the main page. It will store the username in localStorage and display it in the navbar.
- **JavaScript support for future database data:** When a user completes a game (by playing twelve rounds), their score is stored in localStorage, along with a game ID and the username of the player. This data is shown in a table on the scores page.
- **JavaScript support for future WebSocket:** My application generates mocked-up data about usernames and scores of other players that are currently playing and displays it in a table at the bottom of the gameplay page.
- **JavaScript support for your application's interaction logic:** When a user starts a new game (by clicking New Game in the nav bar), random data is generated for fixed and variable costs and a demand curve and displayed on the gameplay page. The user can adjust their price and quantity and submit their choice for twelve rounds. The player's score and other data are adjusted on the gameplay display for each submission.

## Service Deliverable

For this deliverable, I used Node.js to turn my app into a full-stack application with a back-end server and a front-end web client.

- **Create an HTTP service using Node.js and Express:** My application includes an `index.js` file running on my server using Node.js. It uses Express to listen on port 4000 for HTTP requests.
- **Frontend served up using Express static middleware:** My application uses Express static middleware to serve up files in the `public` directory.
- **Your frontend calls third party service endpoints:** `instructions.js` uses fetch to call the `quotable.io` API and get a random business quote to display under the image of Adam Smith.
- **Your backend provides service endpoints:** `index.js` supports `GET` and `POST` endpoints for the `"/scores"` resource.
- **Your frontend calls your service endpoints:** `gameplay.js` calls the `GET "/scores"` endpoint to get the list of games so it knows what ID to give each new game. `gameplay.js` also calls the `POST "/scores"` endpoint to save a new score when a game finishes. `scores.js` calls the `GET "/scores"` endpoint so it can list the top 5 recorded scores in memory.

## Login Deliverable

For this deliverable, I used MongoDB to persistently store user data and authentication data.

- **Supports new user registration:** Users can create an account with my application by filling out the New Users form on the `index.html` page. User authentication data is stored in MongoDB, and the password is encrypted using `brcrypt`. The user is sent a cookie as an authentication token.
- **Supports existing user authentication:** Users can log into my application by filling out the Current Users form on the `index.html` page. The application looks for the username in the MongoDB database, and, if found, tries to match the password to the corresponding password in the database using `brcypt`. If the passwords match, the user is sent a cookie as an authentication token.
- **Stores application data in MongoDB:** When a logged-in user completes a game, their final score is saved to the MongoDB database. The `scores.html` page displays the top five scores from the database.
- **Stores and retrieves credentials in MongoDB:** See user registration and authentication items above.
- **Restricts application functionality based upon authentication:** A user must be logged in to post a new score or view high scores, although a user can play the game without logging in.

## WebSocket Deliverable

For this deliverable, I used WebSocket to send real-time data between users of the application.

- **Backend listens for WebSocket connection:** I added a `peerProxy.js` file that upgrades standard HTTP to a WebSocket connection and listens for WebSocket messages.
- **Frontend makes WebSocket connection:** `gameplay.js` includes functionality that makes a request to upgrade its HTTP or HTTPS connection with the server to an unsecure or secure WebSocket connection.
- **Data sent over WebSocket connection:** When a player submits their price and quantity on the `gameplay.html` page, their updated score is sent from `gameplay.js` via WebSocket to the server (`peerProxy.js`), which broadcasts it to all other players with a WebSocket connection. Additionally, when a player leaves the game or otherwise loses their WebSocket connection, a message is sent from the server to notify all other players.
- **WebSocket data displayed in the application interface:** When `gameplay.js` receives a WebSocket message with another player's score, it adds the player's username and score to the Currently Playing table on `gameplay.html` by manipulating the DOM. When it receives a message indicating that a player left the game, that player's information is removed from the Currently Playing table in a similar manner.

## React Deliverable

For this deliverable, I converted my application to a modern web application using the web framework React.

- **Bundled using Vite:** Uses vite for both development debugging and production building.
- **Multiple functional react components:** The app uses `app.jsx` to display the header and footer and to handle the router. Each of the pages now consists of one or more React components contained in one or more `.jsx` files in the `src` folder.
- **React router:** The React router is located in the `app.jsx` file and provides links to the `instruction`, `login`, `gameplay`, and `scores` components.
- **React hooks:** The `Scores` component uses `React.useEffect` to call the asynchronous function to pull scores from the database and display them on the page.
