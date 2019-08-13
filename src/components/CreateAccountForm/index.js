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
    createAccountAction(state);
  };

  return <CreateAccountForm onChange={onChange} onSubmit={onSubmit} feedback={feedback} values={state} />;
}

const mapStateToProps = ({ users }) => ({ users });

export default connect(
  mapStateToProps,
  { createAccount }
)(CreateAccountFormContainer);