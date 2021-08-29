import BowlFrame from './BowlFrame'
const each = require("jest-each").default

function createBowlFrame(droppedPinList) {
    let bowlFrame = new BowlFrame()
    droppedPinList.forEach(dPins => {
        bowlFrame.updateScore(dPins)
    });
    return bowlFrame;
}

describe("BowlFrame score test", () => {
    //[Frame update scores list, Expected total score, Expected Frame Complete, Expected Score Complete ]
    each([
        [[5,3,2], 8, true, true],       // Regular frame with 2 rounds
        [[10,5,5,8], 20, true, true],   // Strike Frame
        [[5,5,4,6], 14, true, true],    // Spare Frame
        [[4], 4, false, false],          // Incomplete frame remaining second round
        [[10], 10, true, false],         // Strike frame should be complete, score should be incomplete as bonus are remaining
        [[10, 3], 13, true, false],
        [[10, 10, 10], 30, true, true],
        [[5,5], 10, true, false]
    ]).it("when the bowling input is '%s', score should be '%s' and frame complete should be '%s' and score complete should be '%s'", (droppedPinList, expectedScore, expectedFrameComplete, expectedScoreComplete) => {
        let bowlFrame = createBowlFrame(droppedPinList);
        expect(bowlFrame.getFrameScore()).toBe(expectedScore);
        expect(bowlFrame.isFrameComplete()).toBe(expectedFrameComplete);
        expect(bowlFrame.isScoreComplete()).toBe(expectedScoreComplete);
    });
});

describe("BowlFrame score display test", () => {
    each([
        [[5,3,2], 5, 3],       // Regular frame with 2 rounds
        [[10,5,5,8], 'X', ''],   // Strike Frame
        [[5,5,4,6], 5, '/'],     // Spare Frame
        [[5], 5, '']
    ]).it("when the bowling input is '%s' Round 1 should be '%s' Round 2 should be '%s'", (droppedPinList, round1Display, round2Display) => {
        let bowlFrame = createBowlFrame(droppedPinList);
        expect(bowlFrame.round1Display()).toBe(round1Display);
        expect(bowlFrame.round2Display()).toBe(round2Display);
        
    })
})
