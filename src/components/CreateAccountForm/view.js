import React from 'react'
import { Link } from 'react-router-dom'

export default function CreateAccountForm(props) {
  return(
    <div>
      <form onSubmit={props.onSubmit}>
        <h2>Create an account</h2>
        <label>Username:</label>
        <input type='text' required name='name' onChange={props.onChange} value={props.values.name}></input>
        <label>Password:</label>
        <input type='password' required name='password' onChange={props.onChange} value={props.values.password}></input>
        <button type='submit'>Create account</button>
      </form>
      <p className='form-feedback'>{props.feedback}</p>
      <p>Already have an account? <Link to='/login'>Login here</Link></p>
    </div>
  )
}