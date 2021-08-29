import BowlFrame from "./BowlFrame"
export default class ScoreBoard {   
    constructor(playerName) {
        this.playerName = playerName
        this.frames = []  
        for(let i=0; i<10; ++i) {
            this.frames.push(new BowlFrame(i + 1))
        }
        this.runningFrame = 0      
    }    

    updateFrameScore(frameNumber, roundScore) {
        if (frameNumber<0) return;
        this.frames[frameNumber].updateScore(roundScore)
    }    

    isGameComplete(){
        return this.runningFrame === 9 && this.frames[this.runningFrame].isScoreComplete()
    }

    updateScore(roundScore) {
        if (this.isGameComplete()){
            console.log("Game for player " + this.playerName + "is complete")
            return
        }
        this.updateFrameScore(this.runningFrame, roundScore)           
        this.updateFrameScore(this.runningFrame - 1, roundScore)
        this.updateFrameScore(this.runningFrame - 2, roundScore)
        if (this.frames[this.runningFrame].isFrameComplete()){            
            if (this.runningFrame < 9){
                // calculate next Frame
                this.runningFrame = this.runningFrame + 1
            }       
            return true    
        }
        return false
    }

    getTotalScore() {
        let totalScore = 0
        this.frames.forEach(frame => {
            totalScore = totalScore + frame.getFrameScore()
        })
        return totalScore
    }
}