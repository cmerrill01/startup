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
![Image of login user interface with options to register a new account or login to a current account](/assets/images/economentor_login.PNG)

Demonstration of "How to Play" page
![Image of "How to Play" page](/assets/images/economentor_howtoplay.PNG)

Demonstration of gameplay user interface
![Image of gameplay user interface showing key information and providing input options and a "submit" button](/assets/images/economentor_gameplay.PNG)

Demonstration of leaderboard page
![Image of the leaderboard showing a table with the users and their high scores](/assets/images/economentor_leaderboard.PNG)

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