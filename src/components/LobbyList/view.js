import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

export default function LobbyList({
  lobbies,
  submitLobby,
  onchangeLobbyName,
  lobbyName
}) {
  const playersOnline = lobbies.reduce((total, current) => {
    // no lobbies
    if (lobbies.length === 0) {
      return false;
    }

    return total + current.users.length;
  }, 0);

  return (
    <div id="lobby-list-container">
      <div id="lobby-container">
        <h2>Lobbies</h2>

        <div id="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Players</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {lobbies.map(lobby => {
                if (lobby.users.length === 2) {
                  return (
                    <tr key={lobby.id}>
                      <td>{lobby.game}</td>
                      <td>{lobby.users.length} / 2</td>
                      <td className="game-full">Game full</td>
                    </tr>
                  );
                } else {
                  return (
                    <tr key={lobby.id}>
                      <td>{lobby.game}</td>
                      <td>{lobby.users.length} / 2</td>
                      <td>
                        <Link to={`/game/${lobby.id}`}>Join</Link>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
        {playersOnline ? (
          <p>{playersOnline} player(s) currently in games</p>
        ) : (
          <p>0 players currently in games</p>
        )}
      </div>

      <div id="create-lobby-container">
        <div id="create-lobby-form">
          <h2>Create lobby</h2>
          <div className="form-container create-lobby-form-container">
            <form onSubmit={submitLobby}>
              <label>
                Name:
                <input
                  type="text"
                  required
                  minLength={4}
                  name="name"
                  onChange={onchangeLobbyName}
                  value={lobbyName}
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
