import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <form>
        <input
          data-testid="email-input"
          type="text"
          placeholder="Email"
        />
        <input
          data-testid="password-input"
          type="password"
          placeholder="Password"
        />

        <button
          type="submit"
        >
          Entrar
        </button>
      </form>
    );
  }
}

export default Login;
