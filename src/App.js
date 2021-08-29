import Header from './components/Header'
import ScoreBoard from './bowling/ScoreBoard'
import PlayerScoreCard from './components/PlayerScoreCard';
import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import MultiPlayerScoreBoard from './bowling/MultiPlayerScoreBoard';

function App() {
  //const multiBoard = new MultiPlayerScoreBoard()
  const [multiBoard, setMultiBoard] = useState(new MultiPlayerScoreBoard())
  //const [players, setPlayers] = useState([])
  const [pinStatus, setPinStatus] = useState([])
  //const [playerName, setPlayerName] = useState(false)
  const [state, setState] = useState({
    playerName: "",
    gameStarted: false
  })
  //let playerName
  let gameStarted

  // function getClonedBoard() {
  //   return Object.assign(Object.create(Object.getPrototypeOf(multiBoard)), multiBoard)
  // }

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
    //setPlayerName(name)     
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
        <button disabled={state.gameStarted} className="btn btn-primary" onClick={addPlayer}>Add Player</button>
      </div>

      <div style={{ marginTop: 20, alignSelf: "center" }}><button disabled={!canStartGame() || state.gameStarted} className="btn btn-primary" onClick={startGame}>Start Game with selected Players</button></div>

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
      <div style={{ marginTop: 20 }}>
        <label>Pin State: &nbsp;</label>
        <input disabled={!state.gameStarted} type="text" value={pinStatus} onChange={(e) => setPinStatus(e.target.value)}></input>
        <button disabled={!state.gameStarted} className="btn btn-primary" onClick={updateScore}>Update Score</button>
      </div>
      <div style={{display: multiBoard.gameComplete ? "block": "none", textAlign:"center"}}><h1>Thanks for playing. Game End. Refresh to start new Game.</h1></div>
    </div>
  );
}

export default App;
