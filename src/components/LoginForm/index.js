import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loginInAccount } from '../../actions';
import LoginForm from './view';

function LoginFormContainer({
  loginInAccount: loginInAccountAction,
  history,
  users
}) {
  const [state, setState] = useState({ name: '', password: '' });

  useEffect(() => {
    if (users.status === 'OK') {
      history.push('/lobby');
    }
  }, [users.status]);

  const onChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();

    loginInAccountAction(state);
  };

  return <LoginForm onChange={onChange} onSubmit={onSubmit} values={state} />;
}

const mapStateToProps = ({ users }) => ({ users });

export default connect(
  mapStateToProps,
  { loginInAccount }
)(LoginFormContainer);
