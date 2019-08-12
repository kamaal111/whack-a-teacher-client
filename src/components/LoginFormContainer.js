import React from 'react'
import { connect } from 'react-redux'
import { createAccount } from '../actions'
import LoginForm from './LoginForm';

class LoginFormContainer extends React.Component {
  state = {
    name: '',
    password: ''
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault()
    // this.props.createAccount(this.state)
    this.props.history.push('/lobby')
    this.setState({
      name: '',
      password: ''
    })
  }

  render() {
    return(<LoginForm
      onChange={this.onChange}
      onSubmit={this.onSubmit}
      values={this.state}
    />)
  }
}

export default connect(null, { createAccount })(LoginFormContainer)