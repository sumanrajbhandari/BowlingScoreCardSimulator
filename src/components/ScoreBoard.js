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
        this.frames[this.runningFrame].updateScore(roundScore)
    }

    updateScore(newPinState) {
        let prevStandingPinCount = this.getStandingPins(this.pinState)
        let newStandingPinCount = this.getStandingPins(newPinState)
        let roundScore = prevStandingPinCount - newStandingPinCount
        this.updateScore(this.runningFrame)       
        this.updateFrameScore(this.runningFrame - 1)
        this.updateFrameScore(this.runningFrame - 2)
    }
}