import React from 'react'
import { Link } from 'react-router-dom'

export default function CreateAccountForm(props) {
  return(
    <div>
      <form onSubmit={props.onSubmit}>
        <label>Username:</label>
        <input type='text' onChange={props.onChange} value={props.values.username}></input>
        <label>Password:</label>
        <input type='password' onChange={props.onChange} value={props.values.password}></input>
        <button type='submit'>Create account</button>
      </form>
      <p>Already have an account? <Link to='/login'>Login here</Link></p>
    </div>
  )
}