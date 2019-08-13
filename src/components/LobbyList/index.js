import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { autherizeUser } from '../../actions';

class LobbyList extends Component {
  render() {
    console.log('this.props.lobbies.lobbies', this.props.lobbies.lobbies);

    return (
      <div>
        <ul>
          {this.props.lobbies.lobbies.map(lobby => (
            <li key={lobby.id}>
              <Link
                to={`/game/${lobby.id}`}
                onClick={() => console.log('clicked')}
              >
                {lobby.game}{' '}
                {lobby.users !== undefined ? lobby.users.length : 0}/2
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ lobbies }) => ({ lobbies });

export default connect(
  mapStateToProps,
  { autherizeUser }
)(LobbyList);
