import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

export default function LobbyList(props) {
  return (
    <div id="lobby-list-container">
      <div id="lobby-container">
        <h2>Lobbies</h2>
        {/* <ul id='lobby-list'>
          {props.lobbies.map(lobby => (
            <li key={lobby.id}>
              <Link
                to={`/game/${lobby.id}`}
                onClick={() => console.log('clicked')}
              >
                {console.log(lobby)}
                {lobby.game}{' '}
                {lobby.users !== undefined ? lobby.users.length : 0}/2
              </Link>
            </li>
          ))}
        </ul> */}
        <div id="table-container">
          <table>
            <thead>
              <tr>
                <th>Lobby</th>
                <th>Players</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {props.lobbies.map(lobby => {
                return (
                  <tr key={lobby.id}>
                    <td>{lobby.game}</td>
                    <td>{lobby.users.length} / 2</td>
                    <td>
                      <Link to={`/game/${lobby.id}`}>Join</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p>X players online</p>
      </div>

      <div id="create-lobby-container">
        <p>Create lobby</p>
        <div id="create-lobby-form">
          <div className="form-container">
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
