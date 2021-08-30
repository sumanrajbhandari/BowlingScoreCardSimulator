import ScoreBoard from './ScoreBoard'

export default class MultiPlayerScoreBoard {
    constructor() {
        this.playerBoards = [];
        this.currentPlayer = 0;
        this.pinState = [];      // pinState will be 1 for standing pins and 0 for dropped pins        
        this.gameComplete = false;
        this.resetPinState();
    }

    addPlayer(playerName) {
        let playerBoard = new ScoreBoard(playerName)
        this.playerBoards.push(playerBoard)
    }

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

    resetPinState() {
        this.pinState = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    }    

    getStandingPins(pins) {
        let standingPins = 0;
        pins.forEach(pin => {
            standingPins = standingPins + pin
        });
        return standingPins;
    }
    
    updateCurrentPlayer(){
        this.currentPlayer = this.currentPlayer + 1;
        if (this.playerBoards.length == this.currentPlayer) {
            this.currentPlayer = 0                    
        }
    }

    currentPlayerBoard() {
        return this.playerBoards[this.currentPlayer];
    }

    isValidScore(roundScore) {        
        if (this.currentPlayerBoard().isRunningFrameComplete()) return true
        return (this.currentPlayerBoard().getRunningFrameTotalScore() + roundScore) <= 10
    } 
    
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

    updateRoundScore(roundScore) {
        let isFrameComplete = this.currentPlayerBoard().updateScore(roundScore)        
        if (isFrameComplete) {
            if (this.currentPlayerBoard().isLastFrame() && this.currentPlayerBoard().currentFrame().isFrameComplete()){
                // if it is the last frame do not switch player till score is complete
                if (this.currentPlayerBoard().currentFrame().isScoreComplete()){
                    this.switchPlayer()
                }

            } else {
                this.resetPinState()            
                this.switchPlayer()
            }            
        }        
    }

    updateScoreWithPinSate(newPinState) {
        let roundScore = this.getRoundScore(newPinState);
        console.log("Round score" + roundScore)
        this.updateRoundScore(roundScore)
    }
}