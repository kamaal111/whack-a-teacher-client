import React, { Component } from 'react';
import { connect } from 'react-redux';

import LobbyList from './view';

import { createLobbyAuthorization } from '../../actions';

class LobbyListContainer extends Component {
  state = { lobbyName: '' };

  componentDidMount() {
    if (this.props.users.activeUser === null) {
      return this.props.history.push('/login');
    }
    if (this.props.users.activeUser.autherized === false) {
      return this.props.history.push('/login');
    }
  }

  submitLobby = e => {
    e.preventDefault();

    this.props.createLobbyAuthorization(
      this.state.lobbyName,
      this.props.users.activeUser.token
    );
    this.setState({ lobbyName: '' });
  };

  onchangeLobbyName = e => {
    this.setState({ lobbyName: e.target.value });
  };

  render() {
    return (
      <LobbyList
        lobbies={this.props.lobbies}
        submitLobby={this.submitLobby}
        onchangeLobbyName={this.onchangeLobbyName}
        lobbyName={this.state.lobbyName}
      />
    );
  }
}

const mapStateToProps = ({ lobbies, users }) => ({ lobbies, users });

export default connect(
  mapStateToProps,
  { createLobbyAuthorization }
)(LobbyListContainer);
