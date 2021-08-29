import ScoreBoard from './ScoreBoard'
const each = require("jest-each").default

function createScoreBoard(roundScoreList){
    let scoreBoard = new ScoreBoard("Suman")
    roundScoreList.forEach(roundScore => {
        scoreBoard.updateScore(roundScore)
    });
    return scoreBoard
}



describe("ScoreBoard updateScore calculation", () => {
    each([
        // Round Scores, Frame Number, FrameScore, runningFrame
        [[5], 0, 5, 0],     // after first bowl which is not strike
        [[5, 3], 0, 8, 1],  // 2 bowl which is neither strike or spare
        [[10, 10, 10], 0, 30, 3], // Triple strie first frame score test
        [[10, 10, 10], 1, 20, 3],
        [[10, 10, 10], 2, 10, 3],
        [[10,10,10,10,10,10,10,10,10,10,10,10,10], 9, 30, 9, true]
    ]).it("when updateScore called with these pinSatet '%s': Frame '%s' totalScore should be '%s'",
    (roundScoreList, frameNumber, frameScore, runningFrame, gameComplete = false)=>{
        let scoreBoard = createScoreBoard(roundScoreList)
        expect(scoreBoard.frames[frameNumber].getFrameScore()).toBe(frameScore)
        expect(scoreBoard.runningFrame).toBe(runningFrame)
        expect(scoreBoard.isGameComplete()).toBe(gameComplete)
    })
})

describe("ScoreBoard frame complete test", () => {
    each([
        // update score list, expected frame number, expected frame complete call after last updateScore
        [[5], 0, false]
    ]).it("when update score called with these pinState '%s' running frame should be '%s' and frame switch happens should be '%s'",
    (roundScoreList, expectedRunningFrameNumber, isFrameChanged) => {
        let scoreBoard = new ScoreBoard("Suman")
        let frameComplete = null
        roundScoreList.forEach(roundScore => {
            frameComplete = scoreBoard.updateScore(roundScore)
        });
        expect(scoreBoard.runningFrame).toBe(expectedRunningFrameNumber)
        expect(frameComplete).toBe(isFrameChanged)
    })
})