import BowlFrame from "./BowlFrame"
/**
 * This class represents the score board for the single user
 * It consists of ten frames and also track which frame is currently being bowled and whether game is complete for the user.
 */
export default class ScoreBoard {   
    /**
     * Constructor
     * @param {string} playerName Player name for this score board.
     */
    constructor(playerName) {
        this.playerName = playerName
        this.frames = []  
        for(let i=0; i<10; ++i) {
            this.frames.push(new BowlFrame(i + 1))
        }
        this.runningFrame = 0      
    }

    /**
     * Returns true if current running frame is last frame in the score board else returns false
     */
    isLastFrame()
    {
        return this.runningFrame === 9
    }

    /**
     * Returns the currently running frame
     */
    currentFrame() {
        return this.frames[this.runningFrame]
    }
    
    /**
     * returns the total score for the running frame.
     */
    getRunningFrameTotalScore()
    {
        return this.frames[this.runningFrame].getFrameScore()
    }

    /**
     * returns true if the running frame round score calculation is complete
     */
    isRunningFrameComplete()
    {
        return this.frames[this.runningFrame].isFrameComplete()
    }

    /**
     * Call updatescore frame for the frameNumber being passed as parameter
     * @param {number} frameNumber  Frame number for which roundscore will be called.
     * @param {number} roundScore   Number of additional dropped pins in the current bowl
     */
    updateFrameScore(frameNumber, roundScore) {
        if (frameNumber<0) return;
        this.frames[frameNumber].updateScore(roundScore)
    }    

    /**
     * Returns true if all 10 frames score is complete
     */
    isGameComplete(){
        return this.runningFrame === 9 && this.frames[this.runningFrame].isScoreComplete()
    }
    
    /**
     * Updates score in the frame and returns if frame is complete or not.
     * @param {number} roundScore Number of additional dropped pins in the current bowl
     */
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

    /**
     * Returns total score for this score board / Player
     */
    getTotalScore() {
        let totalScore = 0
        this.frames.forEach(frame => {
            totalScore = totalScore + frame.getFrameScore()
        })
        return totalScore
    }
}