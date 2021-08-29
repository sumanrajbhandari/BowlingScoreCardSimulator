import MultiPlayerScoreBoard from './MultiPlayerScoreBoard'
const each = require("jest-each").default

function create2PlayerScoreBoard(roundScores){
    let multiBoard = new MultiPlayerScoreBoard()
    multiBoard.addPlayer("Player 1")
    multiBoard.addPlayer("Player 2")
    roundScores.forEach(roundScore => {
        multiBoard.updateRoundScore(roundScore)
    });
    return multiBoard
}

describe("MultiPlayerScoreBoard round score calculation", () => {
    each([
        // NewPinState
        [[1,1,1,1,0,0,0,1,0,1], 4],
        [[0,0,0,0,0,0,0,0,0,0], 10],
        [[1,1,1,1,1,1,1,1,1,1], 0]
    ]).it("when newPinstate is '%s' round score should be '%s'", (newPinState, roundScore) => {
        let multiPlayerSB = new MultiPlayerScoreBoard()
        multiPlayerSB.addPlayer("Suman");
        multiPlayerSB.resetPinState()
        expect(multiPlayerSB.getRoundScore(newPinState)).toBe(roundScore)
    })
})

describe("MultiPlayerScoreBoard player switch test", () => {
    each([
        //Round scores, expected selected player, expected player 1 score, expected player 2 score
        [[5], 0, 5, 0],
        [[5,2], 1, 7, 0],
        [[10,10,10,10,10,10,10], 1, 90, 60]
    ]).it("when round scores are '%s' then selected players should be '%s'", 
    (roundScores, expectedPlayer, expectedPlayer1Score, expectedPlayer2Score)=>{
        let multiBoard = create2PlayerScoreBoard(roundScores)
        expect(multiBoard.currentPlayer).toBe(expectedPlayer)
        expect(multiBoard.playerBoards[0].getTotalScore()).toBe(expectedPlayer1Score)
        expect(multiBoard.playerBoards[1].getTotalScore()).toBe(expectedPlayer2Score)
    })
})
