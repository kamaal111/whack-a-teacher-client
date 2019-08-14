import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

export default function CreateAccountForm(props) {
  return(
    <div id='create-account-form'>
      <h1>Welcome to <span><img alt='whack!' className='whack-image'></img>A Teacher!</span></h1>
      <div className='form-container'>
        <form onSubmit={props.onSubmit}>
          <h2>Create an account</h2>
          <label>Username:
          <input type='text' required minLength={4} name='name' onChange={props.onChange} value={props.values.name}></input></label>
          <label>Password:
          <input type='password' required minLength={8} maxLength={20} name='password' onChange={props.onChange} value={props.values.password}></input></label>
          <button type='submit'>Create account</button>
        </form>
        <p className='form-feedback'>{props.feedback}</p>
        <p>Already have an account? <Link to='/login'>Login here</Link></p>
      </div>
    </div>
  )
}