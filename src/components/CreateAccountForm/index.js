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

  useEffect(() => {
    if (status === 'OK') {
      history.push('/lobby');
    }
  }, [status]);

  useEffect(() => {
    setStatus(users.status);
  }, [users.status]);

  const onChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();

    createAccountAction(state);
  };

  return <CreateAccountForm onChange={onChange} onSubmit={onSubmit} values={state} />;
}

const mapStateToProps = ({ users }) => ({ users });

export default connect(
  mapStateToProps,
  { createAccount }
)(CreateAccountFormContainer);