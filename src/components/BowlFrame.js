export default class BowlFrame {    
    constructor(frameNumber) {
        this.round1 = 0
        this.round2 = 0
        this.bonus1 = 0
        this.bonus2 = 0
        this.frameNumber = frameNumber        
        this.completedUpdateScoreCallCount = 0
    }

    round1Display() {        
        if (this.isStrike()) return "X"
        if (this.completedUpdateScoreCallCount > 0) return this.round1
        return ""        
    }

    round2Display() {        
        if (this.isSpare()) return "/"
        if (this.isStrike()) return ""
        if (this.completedUpdateScoreCallCount >= 2) return this.round2
        return ""
    }

    isStrike(){
        return this.round1 === 10
    }

    isSpare(){
        return this.round1 < 10 && this.round1 + this.round2 === 10
    }
    
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

    updateRoundScore(pin_count){
        if(this.completedUpdateScoreCallCount === 0)
            this.round1 = pin_count
        if(this.completedUpdateScoreCallCount === 1)
            this.round2 = pin_count
    }

    isFrameComplete(){
        if (this.round1 === 10 || this.completedUpdateScoreCallCount >= 2)
            return true
        else
            return false
    }

    getFrameScore(){
        return this.round1 + this.round2 + this.bonus1 + this.bonus2
    }        

    isScoreComplete(){
        if (this.isStrike() && this.completedUpdateScoreCallCount >= 3)
            return true
        if (this.isSpare() && this.completedUpdateScoreCallCount >= 3)
            return true
        if (this.getFrameScore() < 10 && this.completedUpdateScoreCallCount >= 2)
            return true
        return false
    }     
    
    updateScore(pin_count){
        // If frame score is complete, do nothing
        if (!this.isScoreComplete())
        {
            this.isFrameComplete() ? this.updateBonus(pin_count) : this.updateRoundScore(pin_count)
        }        
        this.completedUpdateScoreCallCount = this.completedUpdateScoreCallCount + 1
    }        
}