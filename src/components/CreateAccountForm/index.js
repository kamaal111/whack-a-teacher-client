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
  const [status, setStatus] = useState(users.status);
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    if (users.status === 'OK') {
      setFeedback('')
      history.push('/lobby');
    } else if (users.status === 'BAD REQUEST') {
      setFeedback('Username already taken. Please choose a different one.')
    }
  }, [users.status]);


  const onChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    const validated = validateInput(state.name, state.password, setFeedback)
    if (validated) {
      createAccountAction(state);
    }
  };

  return <CreateAccountForm onChange={onChange} onSubmit={onSubmit} feedback={feedback} values={state} />;
}

const mapStateToProps = ({ users }) => ({ users });

export default connect(
  mapStateToProps,
  { createAccount }
)(CreateAccountFormContainer);

const validateInput = (name, password, setFeedback) => {
  if (name.length < 4) {
    setFeedback('Username too short. Must be a minimum of 4 characters.')
    return false
  } else if (password.length < 8) {
    setFeedback('Password too short. Must be a minimum of 8 characters.')
    return false
  } else {
    return true
  }
}