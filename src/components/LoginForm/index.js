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
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    if (users.status === 'OK') {
      setFeedback('')
      history.push('/lobby');
    } else if (users.status === 'BAD REQUEST') {
      setFeedback('Username and password combination incorrect. Please try again.')
    }
  }, [history, users.status]);

  const onChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();

    loginInAccountAction(state);
  };

  return <LoginForm onChange={onChange} onSubmit={onSubmit} feedback={feedback} values={state} />;
}

const mapStateToProps = ({ users }) => ({ users });

export default connect(
  mapStateToProps,
  { loginInAccount }
)(LoginFormContainer);
