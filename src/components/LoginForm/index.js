import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loginInAccount } from '../../actions';
import LoginForm from './view';
import './loader.css';

function LoginFormContainer({
  loginInAccount: loginInAccountAction,
  history,
  users
}) {
  const [state, setState] = useState({ name: '', password: '' });
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (users.status === 'OK' && feedback === '') {
      setFeedback(' ')
      history.push('/lobby')
    }
    
    else if (state.name === '' && state.password === '') {
      setFeedback(' ')
    } else if (users.status === 'OK' && feedback === ' ') {
      setFeedback(<p className='loader-text'>Logging in...<span className='loader'></span></p>)
      setTimeout(() => {
        history.push('/lobby')
      }, 1500)
      
    } else if (users.status === 'BAD REQUEST LOGIN') {
      setFeedback(
        'Username and password combination incorrect. Please try again.'
      );
      setTimeout(() => {
        setFeedback(' ')
      }, 1500)
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
