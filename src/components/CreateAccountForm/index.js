import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createAccount } from '../../actions';
import CreateAccountForm from './view';

function CreateAccountFormContainer({
  createAccount: createAccountAction,
  history,
  users
}) {
  const [state, setState] = useState({ name: '', password: '' });
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    if (users.status === 'OK' && feedback === '') {
      setFeedback(' ')
      history.push('/lobby')
    }
    else if (state.name === '' && state.password === '') {
      setFeedback(' ')
    } else if (users.status === 'OK' && feedback === ' ') {
      setFeedback(<p className='loader-text'>Creating account...<span className='loader'></span></p>)
      setTimeout(() => {
        history.push('/lobby')
      }, 1500)
      
    } else if (users.status === 'BAD REQUEST SIGN UP') {
      setFeedback(
        'Username already taken. Please choose a different one.'
      );
      setTimeout(() => {
        setFeedback(' ')
      }, 1500)
    }
  }, [history, users.status]);

  const onChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    createAccountAction(state);
  };

  return <CreateAccountForm onChange={onChange} onSubmit={onSubmit} feedback={feedback} values={state} />;
}

const mapStateToProps = ({ users }) => ({ users });

export default connect(
  mapStateToProps,
  { createAccount }
)(CreateAccountFormContainer);