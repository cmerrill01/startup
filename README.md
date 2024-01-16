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

### Design Images

Demonstration of login user interface
![Image of login user interface with options to register a new account or login to a current account](/assets/images/economentor_login.PNG)

Demonstration of "How to Play" page
![Image of "How to Play" page](/assets/images/economentor_howtoplay.PNG)

Demonstration of gameplay user interface
![Image of gameplay user interface showing key information and providing input options and a "submit" button](/assets/images/economentor_gameplay.PNG)

Demonstration of leaderboard page
![Image of the leaderboard showing a table with the users and their high scores](/assets/images/economentor_leaderboard.PNG)
