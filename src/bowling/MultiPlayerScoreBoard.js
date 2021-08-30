import ScoreBoard from './ScoreBoard'

/**
 * This class handles multiple players use cases.
 * It keep track of current player and once frame is complete switch to the next player whose game is not complete yet.
 */
export default class MultiPlayerScoreBoard {
    /**
     * Constructor. Initialize the class variables.
     */
    constructor() {
        this.playerBoards = [];     // List of players
        this.currentPlayer = 0;     // Initialize current player as the first player in the list
        this.pinState = [];         // pinState will be 1 for standing pins and 0 for dropped pins        
        this.gameComplete = false;
        this.resetPinState();
    }

    /**
     * Create a Scoreboard for a new player with the playername being passed
     * @param {string} playerName player name
     */
    addPlayer(playerName) {
        let playerBoard = new ScoreBoard(playerName)
        this.playerBoards.push(playerBoard)
    }

    /**
     * Returns round score based on the pinstate changed. Compare new pinstate with previous pin state and calculates number of dropped pins in this bowl
     * @param {number} newPinState 10 digit number for new Pinstate after bowl is complete 
     */
    getRoundScore(newPinState) {
        let prevStandingPinCount = this.getStandingPins(this.pinState)
        let newStandingPinCount = this.getStandingPins(newPinState)
        if (newStandingPinCount > prevStandingPinCount){
            console.log("Pin count should be lesser than available pins.")
            alert("Pin count should be lesser than available pins.")            
        } else {
            this.pinState = newPinState
            return prevStandingPinCount - newStandingPinCount
        }        
    }

    /**
     * Resets pin to all standing pins. This will be called after every frame complete.
     */
    resetPinState() {
        this.pinState = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    }    

    /**
     * Returns the number of standing pins represented by this 10 digit number
     * @param {number} pins pin state based on 10 digit 1 and 0
     */
    getStandingPins(pins) {
        let standingPins = 0;
        pins.forEach(pin => {
            standingPins = standingPins + pin
        });
        return standingPins;
    }
    
    /**
     * Find the next player after the current player.
     */
    updateCurrentPlayer(){
        this.currentPlayer = this.currentPlayer + 1;
        if (this.playerBoards.length === this.currentPlayer) {
            this.currentPlayer = 0                    
        }
    }

    /**
     * Returns scoreboard for the currently active player
     */
    currentPlayerBoard() {
        return this.playerBoards[this.currentPlayer];
    }

    /**
     * Returns true if the roundScore passed is valid. Sum of Round score for 2 tries in a frame should be not exceed 10
     * @param {number} roundScore round score passed for this bowl
     */
    isValidScore(roundScore) {        
        if (this.currentPlayerBoard().isRunningFrameComplete()) return true
        return (this.currentPlayerBoard().getRunningFrameTotalScore() + roundScore) <= 10
    }     

    /**
     * Update current player value to switch between players. Switches to player whose game is not complete yet.
     */
    switchPlayer() {
        for(let i=0; i<this.playerBoards.length; ++i){
            this.updateCurrentPlayer()
            if (!this.playerBoards[this.currentPlayer].isGameComplete()){
                this.gameComplete = false;
                return;
            }                
        }    
        this.gameComplete = true        
    }

    /**
     * Updates score for the current player
     * @param {number} roundScore 
     */
    updateRoundScore(roundScore) {
        let isFrameComplete = this.currentPlayerBoard().updateScore(roundScore)        
        if (isFrameComplete) {            
            if (this.currentPlayerBoard().isLastFrame() && this.currentPlayerBoard().currentFrame().isFrameComplete()){
                // if it is the last frame do not switch player till score is complete
                if (this.currentPlayerBoard().currentFrame().isScoreComplete()){
                    this.switchPlayer()
                }
                this.resetPinState()
            } else {
                this.resetPinState()            
                this.switchPlayer()
            }            
        }        
    }

    /**
     * Updates current player score using the pin state
     * @param {number} newPinState 
     */
    updateScoreWithPinSate(newPinState) {
        let roundScore = this.getRoundScore(newPinState);
        console.log("Round score" + roundScore)
        this.updateRoundScore(roundScore)
    }
}