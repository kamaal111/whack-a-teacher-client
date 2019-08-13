import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { autherizeUser } from '../../actions';

class LobbyList extends Component {
  renderLobbyList = () => {
    if (this.props.users.activeUser === null) return <h3>Please login</h3>;

    return (
      <div>
        <ul>
          {this.props.lobbies.lobbies.map(lobby => (
            <li key={lobby.id}>
              <Link to={`/game/${lobby.id}`}>
                {lobby.game}{' '}
                {lobby.users !== undefined ? lobby.users.length : 0}/2
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  render() {
    return this.renderLobbyList();
  }
}

const mapStateToProps = ({ lobbies, users }) => ({ lobbies, users });

export default connect(
  mapStateToProps,
  { autherizeUser }
)(LobbyList);
