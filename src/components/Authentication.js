import React from 'react'
import { Link } from 'react-router-dom'

export default function Authentication(props) {
  const renderLogin = () => {
    console.log(5)
  }

  if (props.login) {
    return(
      <p>Hello</p>
    )
  }

  const form = <div>
    <form onSubmit={props.onSubmit}>
      <label>Username:</label>
      <input type='text' onChange={props.onChange} value={props.values.username}></input>
      <label>Password:</label>
      <input type='password' onChange={props.onChange} value={props.values.password}></input>
      <button type='submit'>Create account</button>
    </form>
  </div>

  return(
    <div>
      <form onSubmit={props.onSubmit}>
        <label>Username:</label>
        <input type='text' onChange={props.onChange} value={props.values.username}></input>
        <label>Password:</label>
        <input type='password' onChange={props.onChange} value={props.values.password}></input>
        <button type='submit'>Create account</button>
      </form>
      <p>Already have an account? <a href='#login' onClick={() => renderLogin()}>Login here</a></p>
    </div>
  )
}