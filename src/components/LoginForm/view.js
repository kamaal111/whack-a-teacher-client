import React from 'react'
import { Link } from 'react-router-dom'

export default function LoginForm(props) {
  return(
    <div id='login-form'>
      <h1>Welcome to <span>Whack A Teacher!</span></h1>
      <div className='form-container'>
        <form onSubmit={props.onSubmit}>
          <h2>Log in</h2>
          <label>Username:
          <input type='text' name='name' onChange={props.onChange} value={props.values.username}></input></label>
          <label>Password:
          <input type='password' name='password' onChange={props.onChange} value={props.values.password}></input></label>
          <button type='submit'>Log in</button>
        </form>
        <p className='form-feedback'>{props.feedback}</p>
        <p>Don't have an account yet? <Link to='/'>Sign up here</Link></p>
      </div>
    </div>
  )
}