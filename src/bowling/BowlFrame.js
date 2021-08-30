/**
 * This class represents a single frame in the score board. 
 * The main method that will be called is updateRoundScore. 
 * UpdateRoundScore could be called multiple times but it will only update the score if frame scoring is not complete.
 */
export default class BowlFrame {    
    /**
     * Constructor
     * @param {number} frameNumber The frame number from the one full scoreboard.
     */
    constructor(frameNumber) {
        this.round1 = 0     // Score for the first bowl in a frame
        this.round2 = 0     // Score for the second bowl in a frame                
        this.bonus1 = 0     // Bonus1 is first bonus for either Spare or Strike
        this.bonus2 = 0     // Bonus2 is the second bonus if this frame is Strike
        this.frameNumber = frameNumber          // Frame number in the ScoreBoard. Will be use handle special case of 10th frame   
        this.completedUpdateScoreCallCount = 0  // Number of times updateRoundScore has been successfully called. This helps to track the frame state.
    }

    /**
     * Returns display text for the 1st round score. 
     */
    round1Display() {        
        if (this.isStrike()) return "X"
        if (this.completedUpdateScoreCallCount > 0) return this.round1
        return ""        
    }

    /**
     * Return display text for the 2nd round score.
     */
    round2Display() {
        if(this.frameNumber === 10 && this.isStrike() && this.completedUpdateScoreCallCount >= 2) return this.bonus1        
        if (this.isSpare()) return "/"
        if (this.isStrike()) return ""
        if (this.completedUpdateScoreCallCount >= 2) return this.round2
        return ""
    }

    /**
     * Returns the display text for the last frame 3rd shot.
     */
    lastFrameThirdBowl() {
        if(this.frameNumber === 10){
            if (this.isSpare() && this.completedUpdateScoreCallCount >=3) return this.bonus1
            if (this.isStrike() && this.completedUpdateScoreCallCount >=3) return this.bonus2
        }
    }

    /**
     * Returns true if frame is strike otherwise returns false
     */
    isStrike(){
        return this.round1 === 10
    }

    /**
     * Returns true if frame is spare otherwise false.
     */
    isSpare(){
        return this.round1 < 10 && this.round1 + this.round2 === 10
    }
    
    /**
     * Updates the bonus values based on whehter the frame is strike spare or regular frame.
     * @param {number} pin_count Number of dropped pins in the current bowl
     */
    updateBonus(pin_count){
        if (this.isStrike()){
            if(this.completedUpdateScoreCallCount === 1){
                this.bonus1 = pin_count
            }
            if(this.completedUpdateScoreCallCount === 2){
                this.bonus2 = pin_count
            }
        }
        if(this.isSpare()){
            this.bonus1 = pin_count
        }
    }

    /**
     * Updates round1 and round2 score based on the frame state
     * @param {number} pin_count Number of dropped pins in the current bowl
     */
    updateRoundScore(pin_count){
        if(this.completedUpdateScoreCallCount === 0)
            this.round1 = pin_count
        if(this.completedUpdateScoreCallCount === 1)
            if (this.round1 + pin_count <= 10)
                this.round2 = pin_count            
    }

    /**
     * Returns true if both the ball in frame is complete or if 1st round score is strike
     */
    isFrameComplete(){
        if (this.round1 === 10 || this.completedUpdateScoreCallCount >= 2)
            return true
        else
            return false
    }

    /**
     * Returns the total score for frame based on the round and bonus scores.
     */
    getFrameScore(){
        return this.round1 + this.round2 + this.bonus1 + this.bonus2
    }        

    /**
     * Returns display text for the Frame score
     */
    getFrameScoreDisplay() {
        if (this.completedUpdateScoreCallCount >= 1){
            return this.getFrameScore()
        } else {
            return ""
        }
    }

    /**
     * Returns the frame score display color based on the frame state.      
     */
    getTotalScoreColor() {
        if (this.isFrameComplete() && !this.isScoreComplete()) return "yellow"
        if (this.isScoreComplete()) return "green"
        return "white"
    }

    /**
     * Returns whether all the round score and bonus score for this frame is complete
     */
    isScoreComplete(){
        if (this.isStrike() && this.completedUpdateScoreCallCount >= 3)
            return true
        if (this.isSpare() && this.completedUpdateScoreCallCount >= 3)
            return true
        if (this.getFrameScore() < 10 && this.completedUpdateScoreCallCount >= 2)
            return true
        return false
    }     
    
    /**
     * Updates the frame scores based in the state of the frame
     * @param {number} pin_count Number of dropped pins in the current bowl
     */
    updateScore(pin_count){
        // If frame score is complete, do nothing
        if (!this.isScoreComplete())
        {
            this.isFrameComplete() ? this.updateBonus(pin_count) : this.updateRoundScore(pin_count)
        }        
        this.completedUpdateScoreCallCount = this.completedUpdateScoreCallCount + 1
    }        
}