import BowlFrame from "./BowlFrame"
export default class ScoreBoard {   
    constructor(playerName) {
        this.playerName = playerName
        this.frames = []  
        for(let i=0; i<10; ++i) {
            this.frames.push(new BowlFrame(i + 1))
        }
        this.runningFrame = 0        
        this.pinState = []      // pinState will be 1 for standing pins and 0 for dropped pins
        this.resetPinState()
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

    updateFrameScore(frameNumber, roundScore) {
        if (frameNumber<0) return;
        this.frames[frameNumber].updateScore(roundScore)
    }

    getRoundScore(newPinState) {
        let prevStandingPinCount = this.getStandingPins(this.pinState)
        let newStandingPinCount = this.getStandingPins(newPinState)
        return prevStandingPinCount - newStandingPinCount
    }

    // return true if frame is complete
    updateScore(newPinState) {
        let roundScore = this.getRoundScore(newPinState)
        return this.updateScoreWithRoundScore(roundScore)
    }

    isGameComplete(){
        return this.runningFrame === 9 && this.frames[this.runningFrame].isScoreComplete()
    }

    updateScoreWithRoundScore(roundScore) {
        if (this.isGameComplete()){
            console.log("Game for player " + this.playerName + "is complete")
            return
        }
        this.updateFrameScore(this.runningFrame, roundScore)           
        this.updateFrameScore(this.runningFrame - 1, roundScore)
        this.updateFrameScore(this.runningFrame - 2, roundScore)
        if (this.frames[this.runningFrame].isFrameComplete()){
            this.resetPinState()
            if (this.runningFrame < 9){
                // calculate next Frame
                this.runningFrame = this.runningFrame + 1
            }       
            return true    
        }
        return false
    }
}