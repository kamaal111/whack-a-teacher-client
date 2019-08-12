import React from 'react'
import { connect } from 'react-redux'
import { createAccount } from '../actions'
import Authentication from './Authentication'

class LandingPage extends React.Component {
  state = {
    username: '',
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
    console.log('Account created')
    this.setState({
      username: '',
      password: ''
    })
  }

  render() {
    return(<Authentication 
      onChange={this.onChange}
      onSubmit={this.onSubmit}
      values={this.state}
    />)
  }
}

export default connect(null, { createAccount })(LandingPage)