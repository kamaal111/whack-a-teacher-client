import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

export default function LobbyList(props) {
  const playersOnline = props.lobbies.reduce((total, current, index) => {
    // no lobbies
    if (props.lobbies.length === 0) {
      console.log(props.lobbies)
      return false
    } else {
    return total + current.users.length
    }
  }, 0)

  return (
    <div id="lobby-list-container">
      <div id="lobby-container">
        <h2>Lobbies</h2>

        <div id='table-container'>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Players</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {props.lobbies.map(lobby => {

                if (lobby.users.length === 2) {
                  return <tr key={lobby.id}>
                    <td>{lobby.game}</td>
                    <td>{lobby.users.length} / 2</td>
                    <td className='game-full'>Game full</td>
                  </tr>
                } else {
                  return <tr key={lobby.id}>
                    <td>{lobby.game}</td>
                    <td>{lobby.users.length} / 2</td>
                    <td><Link to={`/game/${lobby.id}`}>Join</Link></td>
                  </tr>
                }
              })}
            </tbody>
          </table>
        </div>
        {playersOnline ? <p>{playersOnline} players online</p> : <p>0 players online</p>}
      </div>

      <div id="create-lobby-container">
        <h2>Create lobby</h2>
        <div id="create-lobby-form">
          <div className="form-container create-lobby-form-container">
            <form onSubmit={props.submitLobby}>
              <label>
                Name:
                <input
                  type="text"
                  required
                  minLength={4}
                  name="name"
                  onChange={props.onchangeLobbyName}
                  value={props.lobbyName}
                />
              </label>
              <button type="submit">Create lobby</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
