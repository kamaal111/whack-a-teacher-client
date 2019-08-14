import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loginInAccount } from '../../actions';
import LoginForm from './view';
import './loader.css'

function LoginFormContainer({
  loginInAccount: loginInAccountAction,
  history,
  users
}) {
  const [state, setState] = useState({ name: '', password: '' });
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (users.status === 'OK') {
      setFeedback(<div><span className='loader-text'>Logging in...</span><div className='loader'></div></div>)
      // setTimeout(() => {
        setFeedback('')
        history.push('/lobby')
      // }, 1500);
    }
    // Ensures no form feedback when switching from create account to login
    else if (state.name === '' && state.password === '') {
      setFeedback(
        ''
      )
    } else if (users.status === 'BAD REQUEST LOGIN') {
      setFeedback(
        'Username and password combination incorrect. Please try again.'
      );
    }
  }, [history, users.status]);

  const onChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();

    loginInAccountAction(state);
  };

  return (
    <LoginForm
      onChange={onChange}
      onSubmit={onSubmit}
      feedback={feedback}
      values={state}
    />
  );
}

const mapStateToProps = ({ users }) => ({ users });

export default connect(
  mapStateToProps,
  { loginInAccount }
)(LoginFormContainer);
