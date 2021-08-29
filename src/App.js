import Header from './components/Header'
import ScoreBoard from './bowling/ScoreBoard'
import PlayerScoreCard from './components/PlayerScoreCard';
import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import MultiPlayerScoreBoard from './bowling/MultiPlayerScoreBoard';
import { Tooltip } from 'bootstrap';

function App() {
  const [multiBoard, setMultiBoard] = useState(new MultiPlayerScoreBoard())  
  const [pinStatus, setPinStatus] = useState([])  
  const [roundScore, setRoundScore] = useState([])
  const [inputTab, setInputTab] = useState(0)
  const [state, setState] = useState({
    playerName: "",
    gameStarted: false
  })

  function updateBoardState() {
    setMultiBoard(Object.assign(Object.create(Object.getPrototypeOf(multiBoard)), multiBoard))
  }

  function addPlayer() {
    multiBoard.addPlayer(state.playerName)
    updateBoardState()    
    setState({ ...state, playerName: "" })    
  }

  function startGame() {
    console.log("Starting Game. No more players can be added.")
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
    if (pinStatus.length === 10)
    {
      let pins = [...pinStatus]
      let pinArray = pins.map(pin=>{
        if (pin == '0' || pin == '1') {
          return Number(pin)
        } else {
          alert("Invalid pin input")
          error = true
        }
      })
      if (!error) {
        multiBoard.updateScoreWithPinSate(pinArray)
        updateBoardState()        
      }      
    } else {
      alert("Pin State should be represented by 10: 1 and 0")
    }   
  }

  function updateRoundScore() {
    let roundScoreInt = Number(roundScore)
    if (roundScoreInt < 0 || roundScoreInt > 10){
      alert("Round score should be between 0 and 10.")
      return
    }
    if (multiBoard.isValidScore(roundScoreInt))
    {
      multiBoard.updateRoundScore(roundScoreInt)
      updateBoardState()
    } else {
      alert("Invalid score. Sum of round 1 and round 2 score should be less than 10")
    }    
  }

  function startGame() {
    console.log("Game Started")
    setState({ ...state, gameStarted: true })    
  }

  return (
    <div className="App">
      <Header />
      <div disabled={state.gameStarted}>
        <label>Player Name: &nbsp;</label>
        <input disabled={state.gameStarted} type="text" value={state.playerName} onChange={(e) => updatePlayerName(e.target.value)}></input>
        &nbsp;&nbsp;
        <button disabled={state.gameStarted} className="btn btn-primary" onClick={addPlayer}>Add Player</button>&nbsp;&nbsp;
        <button disabled={!canStartGame() || state.gameStarted} className="btn btn-primary" onClick={startGame}>Start Game with selected Players</button>
      </div>

      <div style={{ marginTop: 20, alignSelf: "center" }}></div>

      <div style={{ marginTop: 20 }}></div>
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
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className="nav-link" onClick={() => setInputTab(0)}>Update Using Pin Status</a>           
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#" onClick={() => setInputTab(1)}>Update using round score</a>
        </li>        
      </ul>
      <div className="container" style={{ marginTop: 20 }} style={{display: inputTab==0 ? "block" : "none"}}>
        <label>Pin State: &nbsp;</label>
        <input disabled={!state.gameStarted} type="number" value={pinStatus} onChange={(e) => setPinStatus(e.target.value)}></input>
        
          <button disabled={!state.gameStarted} className="btn btn-primary" onClick={updateScore}>Update Score</button>        
         
        <label>&nbsp; &npsp; Input should be 0000000000 if all pinned are dropped. </label>
      </div>
      <div className="container" style={{display: inputTab==1 ? "block" : "none"}}>
        <label>Round Score: &nbsp;</label>
        <input disabled={!state.gameStarted} type="number" value={roundScore} onChange={(e) => setRoundScore(e.target.value)}></input>
        <button disabled={!state.gameStarted} className="btn btn-primary" onClick={updateRoundScore}>Update Score</button>
      </div>
      <div style={{marginTop:50, display: multiBoard.gameComplete ? "block": "none", textAlign:"center"}}><h3>Thanks for playing. Game End. Refresh to start new Game.</h3></div>
    </div>
  );
}

export default App;
