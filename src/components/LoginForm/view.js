import React from 'react';
import { Link } from 'react-router-dom';
import '../CreateAccountForm/styles.css';

export default function LoginForm(props) {
  return (
    <div id="login-form">
      <h1>
        Welcome to{' '}
        <span>
          <img alt="whack!" className="whack-image" />A Teacher!
        </span>
      </h1>
      <div className="form-container">
        <form onSubmit={props.onSubmit}>
          <h2>Log in</h2>
          <label>
            Username:
            <input
              type="text"
              name="name"
              required
              onChange={props.onChange}
              value={props.values.username}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              required
              onChange={props.onChange}
              value={props.values.password}
            />
          </label>
          <button type="submit">Log in</button>
        </form>
        <div className="form-feedback">{props.feedback}</div>
        <p>
          Don't have an account yet? <Link to="/">Sign up here</Link>
        </p>
      </div>
    </div>
  );
}
