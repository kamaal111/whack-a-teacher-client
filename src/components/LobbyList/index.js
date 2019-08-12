import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { allLobbies } from '../../actions';

class LobbyList extends Component {
  state = { lobbyName: '' };

  source = new EventSource(
    `https://morning-caverns-95025.herokuapp.com/stream`
  );

  componentDidMount() {
    this.source.onmessage = event => {
      this.props.allLobbies(JSON.parse(event.data));
    };
  }

  render() {
    console.log('this.props.lobbies.lobbies', this.props.lobbies.lobbies);

    return (
      <div>
        <ul>
        {this.props.lobbies.lobbies.map(lobby => (
          <li key={lobby.id}><Link to={`/game/${lobby.id}`}>
            {lobby.game} {lobby.users !== undefined ? lobby.users.length : 0}/2
          </Link></li>
        ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ lobbies }) => ({ lobbies });

export default connect(
  mapStateToProps,
  { allLobbies }
)(LobbyList);
