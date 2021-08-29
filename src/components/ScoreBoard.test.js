import ScoreBoard from './ScoreBoard'
const each = require("jest-each").default

function createScoreBoard(roundScoreList){
    let scoreBoard = new ScoreBoard("Suman")
    roundScoreList.forEach(roundScore => {
        scoreBoard.updateScoreWithRoundScore(roundScore)
    });
    return scoreBoard
}

describe("ScoreBoard round score calculation", () => {
    each([
        // NewPinState
        [[1,1,1,1,0,0,0,1,0,1], 4],
        [[0,0,0,0,0,0,0,0,0,0], 10],
        [[1,1,1,1,1,1,1,1,1,1], 0]
    ]).it("when newPinstate is '%s' round score should be '%s'", (newPinState, roundScore) => {
        let scoreBoard = new ScoreBoard("Suman");
        scoreBoard.resetPinState()
        expect(scoreBoard.getRoundScore(newPinState)).toBe(roundScore)
    })
})

describe("ScoreBoard updateScore calculation", () => {
    each([
        // Round Scores, Frame Number, FrameScore, runningFrame
        [[5], 0, 5, 0],     // after first bowl which is not strike
        [[5, 3], 0, 8, 1],  // 2 bowl which is neither strike or spare
        [[10, 10, 10], 0, 30, 3], // Triple strie first frame score test
        [[10, 10, 10], 1, 20, 3],
        [[10, 10, 10], 2, 10, 3],
        [[10,10,10,10,10,10,10,10,10,10,10,10,10], 9, 30, 9, true]
    ]).it("when updateScore called with these pinSatete '%s': Frame '%s' totalScore should be '%s'",
    (roundScoreList, frameNumber, frameScore, runningFrame, gameComplete = false)=>{
        let scoreBoard = createScoreBoard(roundScoreList)
        expect(scoreBoard.frames[frameNumber].getFrameScore()).toBe(frameScore)
        expect(scoreBoard.runningFrame).toBe(runningFrame)
        expect(scoreBoard.isGameComplete()).toBe(gameComplete)
    })
})