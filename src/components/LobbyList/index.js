import React, { Component } from 'react';
import { connect } from 'react-redux';

import LobbyList from './view';

import { createLobbyAuthorization } from '../../actions';

class LobbyListContainer extends Component {
  componentDidMount() {
    if (this.props.users.activeUser === null) {
      return this.props.history.push('/login');
    }

    if (this.props.users.activeUser.autherized === false) {
      return this.props.history.push('/login');
    }
  }

  render() {
    return <LobbyList lobbies={this.props.lobbies} />;
  }
}

const mapStateToProps = ({ lobbies, users }) => ({ lobbies, users });

export default connect(
  mapStateToProps,
  { createLobbyAuthorization }
)(LobbyListContainer);
