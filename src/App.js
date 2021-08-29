import Header from './components/Header'
import ScoreBoard from './components/ScoreBoard'
import PlayerScoreCard from './components/PlayerScoreCard';
import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [players, setPlayers] = useState([])
  const [pinStatus, setPinStatus] = useState([])
  //const [playerName, setPlayerName] = useState(false)
  const [state, setState] = useState({
    playerName: "",
    gameStarted: false
  })
  //let playerName
  let gameStarted

  function addPlayer() {
    setPlayers([...players, new ScoreBoard(state.playerName)])
    setState({ ...state, playerName: "" })
    //setPlayerName("")
  }

  function startGame() {
    console.log("Starting Game. No more players can be added.")
  }

  function updatePlayerName(name) {
    setState({ ...state, playerName: name })
    //setPlayerName(name)     
  }


  function canStartGame() {
    if (players.length > 0)
      return true
    else
      return false
  }

  function updateScore() {
    console.log("New pin state = " + pinStatus)
  }

  function startGame() {
    console.log("Game Started")
    setState({ ...state, gameStarted: true })
    // let playersList = players.map((plr, index) => {
    //   if (index === 0) {
    //     let updatedItem = Object.assign(Object.create(Object.getPrototypeOf(plr)), plr)
    //     updatedItem.frames[0].updateScore(5)
    //     return updatedItem
    //   }
    //   else {
    //     return plr
    //   }
    // })    
    //setPlayers({ ...playersList })
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
            players.map((player) => (
              <PlayerScoreCard key={player.playerName} playerData={player}></PlayerScoreCard>
            ))}
        </tbody>

      </table>
      <div style={{ marginTop: 20 }}>
        <label>Pin State: &nbsp;</label>
        <input disabled={!state.gameStarted} type="text" value={pinStatus} onChange={(e) => setPinStatus(e.target.value)}></input>
        <button disabled={!state.gameStarted} className="btn btn-primary" onClick={updateScore}>Update Score</button>
      </div>
    </div>
  );
}

export default App;
