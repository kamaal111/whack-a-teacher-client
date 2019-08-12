import React from 'react'
import { connect } from 'react-redux'
import { createAccount } from '../../actions'
import CreateAccountForm from './view';

class CreateAccountFormContainer extends React.Component {
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
    this.props.createAccount(this.state)
    this.props.history.push('/lobby')
    this.setState({
      name: '',
      password: ''
    })
  }

  render() {
    return(<CreateAccountForm 
      onChange={this.onChange}
      onSubmit={this.onSubmit}
      values={this.state}
    />)
  }
}

export default connect(null, { createAccount })(CreateAccountFormContainer)