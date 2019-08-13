import React, { Component } from 'react';
import { connect } from 'react-redux';
import LobbyList from './view'
import { autherizeUser } from '../../actions';

class LobbyListContainer extends Component {
  render() {
    return (
      <LobbyList 
        lobbies={this.props.lobbies}
      />
    );
  }
}

const mapStateToProps = ({ lobbies, users }) => ({ lobbies, users });

export default connect(
  mapStateToProps,
  { autherizeUser }
)(LobbyListContainer);
