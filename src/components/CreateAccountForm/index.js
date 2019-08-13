import React from 'react';
import { connect } from 'react-redux';
import { createAccount } from '../../actions';
import CreateAccountForm from './view';

class CreateAccountFormContainer extends React.Component {
  state = {
    name: '',
    password: ''
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.createAccount(this.state);

    if (this.props.users.status === 'OK') {
      return this.props.history.push('/lobby');
    }
  };

  render() {
    console.log('this.props', this.props);
    return (
      <CreateAccountForm
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        values={this.state}
      />
    );
  }
}

const mapStateToProps = ({ users }) => ({ users });

export default connect(
  mapStateToProps,
  { createAccount }
)(CreateAccountFormContainer);
