import Header from './components/Header'
import PlayerScoreCard from './components/PlayerScoreCard';
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import MultiPlayerScoreBoard from './bowling/MultiPlayerScoreBoard';
import React from 'react';


function App() {  
  const [multiBoard, setMultiBoard] = useState(new MultiPlayerScoreBoard())
  const [pinStatus, setPinStatus] = useState([])
  const [roundScore, setRoundScore] = useState()
  const [errorMessage, setErrorMessage] = useState("")
  const [state, setState] = useState({
    playerName: "",
    gameStarted: false
  })

  function updateBoardState() {
    setMultiBoard(Object.assign(Object.create(Object.getPrototypeOf(multiBoard)), multiBoard))
  }

  function addPlayer() {
    if (state.playerName !== "") {
      multiBoard.addPlayer(state.playerName)
      updateBoardState()
      setState({ ...state, playerName: "" })
      setErrorMessage("")
    } else {
      //setErrorMessage("Enter Player Name to add new player. ")
      setErrorMessage("Enter Player Name to add new player. ")
    }
  }

  function updatePlayerName(name) {
    setState({ ...state, playerName: name })
  }

  function canStartGame() {
    if (multiBoard.playerBoards !== undefined && multiBoard.playerBoards.length > 0)
      return true
    else
      return false
  }

  function updateScore() {
    console.log("New pin state = " + pinStatus)
    let error = false;
    if (pinStatus.length === 10) {
      let pins = [...pinStatus]
      let pinArray = pins.map(pin => {
        if (pin === '0' || pin === '1') {
          return Number(pin)
        } else {
          setErrorMessage("Invalid pin input")
          error = true
          return 0
        }
      })
      if (!error) {
        multiBoard.updateScoreWithPinSate(pinArray)
        updateBoardState()
        setErrorMessage("")
      }
    } else {
      setErrorMessage("Pin State should be represented by 10: 1 and 0")
    }
  }

  function updateRoundScore() {
    if (roundScore === undefined) {
      setErrorMessage("Round Score value should be between 1 to 10.")
      return;
    }
    let roundScoreInt = Number(roundScore)
    if (roundScoreInt < 0 || roundScoreInt > 10) {
      setErrorMessage("Round score should be between 0 and 10.")
      return
    }
    if (multiBoard.isValidScore(roundScoreInt)) {
      multiBoard.updateRoundScore(roundScoreInt)
      updateBoardState()
      setErrorMessage("")
    } else {
      setErrorMessage("Invalid score. Round score should be less than or equal to remaining available pins.")
    }
  }

  function startGame() {
    console.log("Game Started")
    setErrorMessage("")
    setState({ ...state, gameStarted: true })
  }

  return (
    <div className="App, container">
      <Header />
      <React.StrictMode>
        <div disabled={state.gameStarted}>
          <label>Player Name: &nbsp;</label>
          <input disabled={state.gameStarted} type="text" value={state.playerName} onChange={(e) => updatePlayerName(e.target.value)}></input>
        &nbsp;&nbsp;
        <button disabled={state.gameStarted} className="btn btn-primary" onClick={addPlayer}>Add Player</button>&nbsp;&nbsp;
        <button disabled={!canStartGame() || state.gameStarted} className="btn btn-primary" onClick={startGame}>Start Game with selected Players</button>
        </div>

        <div style={{ marginTop: 20, alignSelf: "center" }}></div>

        <div style={{ marginTop: 30 }}></div>
        <div style={{ display: errorMessage === "" ? "none" : "inline" }} className="container alert alert-danger" role="alert">
          {errorMessage}
        </div>
        <div style={{ marginTop: 30 }}></div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th>6</th>
              <th>7</th>
              <th>8</th>
              <th>9</th>
              <th>10</th>
              <th>Total Score</th>
            </tr>
          </thead>
          <tbody>
            {
              multiBoard.playerBoards.map((player, index) => (
                <PlayerScoreCard key={player.playerName} playerData={player} isSelected={index === multiBoard.currentPlayer}></PlayerScoreCard>
              ))}
          </tbody>
        </table>
        <table>
          <tr>
            <td style={{ textAlign: "right" }}> Round Score: </td>
            <td><input placeholder="0 to 10" disabled={!state.gameStarted} type="number" value={roundScore} onChange={(e) => setRoundScore(e.target.value)}></input></td>
            <td><button disabled={!state.gameStarted} className="btn btn-primary" onClick={updateRoundScore}>Update Score</button>&nbsp;&nbsp;</td>
          </tr>
          <tr>
            <td>Pin State:</td>
            <td><input placeholder="1111111111" disabled={!state.gameStarted} type="number" value={pinStatus} onChange={(e) => setPinStatus(e.target.value)}></input></td>
            <td><button disabled={!state.gameStarted} className="btn btn-primary" onClick={updateScore}>Update Score</button></td>
          </tr>
        </table>

        <div style={{ marginTop: 50, display: multiBoard.gameComplete ? "block" : "none", textAlign: "center" }}><h3>Thanks for playing. Game End. Refresh to start new Game.</h3></div>
      </React.StrictMode>
    </div>
  );
}

export default App;
