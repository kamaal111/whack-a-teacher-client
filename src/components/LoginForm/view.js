import React from 'react'
import { Link } from 'react-router-dom'

export default function LoginForm(props) {
  return(
    <div>
      <form onSubmit={props.onSubmit}>
        <h2>Log in</h2>
        <label>Username:</label>
        <input type='text' name='name' onChange={props.onChange} value={props.values.username}></input>
        <label>Password:</label>
        <input type='password' name='password' onChange={props.onChange} value={props.values.password}></input>
        <button type='submit'>Log in</button>
      </form>
      <p>Don't have an account yet? <Link to='/'>Sign up here</Link></p>
    </div>
  )
}