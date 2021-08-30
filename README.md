# Bowling Score card simulation

## npm scripts
### `npm start` 
Runs the app in the development mode at http://localhost:3000.

### `npm test`
Launches the test runner in the interactive watch mode. 

### `npm run build`
Builds the app for production to the `build` folder.

<hr />

## Source Code
All the source code is inside /src folder. It has 2 main directories
### `/src/bowling`
This folder contains the algorithm for maintaing the scorecard.
#### `BowlFrame.js`
This class represents a single frame in the score board. 
#### `ScoreBoard.js`
This class represents the score board for the single player.
#### `MultiPlayerScoreBoard.js`
This class handles multiple players and switing between them.


### `src/components`
This folder consists the presentation components for the score board.

### `src/App.js`
This is the starting point of app. Handles the state and user interactions. 
This can be refactored into multiple comonents. For demo it is in App.js for now.