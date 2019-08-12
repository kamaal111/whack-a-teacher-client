import React from 'react'
import { Link } from 'react-router-dom'

export default function LoginForm(props) {
  return(
    <div>
      <form onSubmit={props.onSubmit}>
        <label>Username:</label>
        <input type='text' onChange={props.onChange} value={props.values.username}></input>
        <label>Password:</label>
        <input type='password' onChange={props.onChange} value={props.values.password}></input>
        <button type='submit'>Create account</button>
      </form>
      <p>Don't have an account yet? <Link to='/'>Sign up here</Link></p>
    </div>
  )
}