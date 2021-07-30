import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { storeEmail } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailIsValid: false,
      passwordIsValid: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  emailChecker(value) {
    /*
      Consultei estes dois links:

      -> RegExp utilizado -> https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail

      -> Quebra de um RegExp muito longo -> https://stackoverflow.com/questions/12317049/how-to-split-a-long-regular-expression-into-multiple-lines-in-javascript
     */
    const emailRegex = new RegExp([
      '^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9]',
      '(?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])',
      '?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$'].join(''));
    const emailIsValid = emailRegex.test(value);
    return emailIsValid;
  }

  passChecker(value) {
    const minChars = 6;
    const passIsValid = value.length >= minChars;
    return passIsValid;
  }

  handleChange({ target }) {
    const { name, value } = target;

    const validation = (name === 'email') ? this
      .emailChecker(value) : this.passChecker(value);

    this.setState({
      [name]: value,
      [`${name}IsValid`]: validation,
    });
  }

  render() {
    const { email, password, emailIsValid, passwordIsValid } = this.state;
    return (
      <form>
        <input
          data-testid="email-input"
          type="text"
          name="email"
          placeholder="Email"
          value={ email }
          onChange={ this.handleChange }
        />
        <input
          data-testid="password-input"
          type="password"
          name="password"
          placeholder="Password"
          value={ password }
          onChange={ this.handleChange }
        />

        <button
          type="submit"
          disabled={ !(emailIsValid && passwordIsValid) }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  saveEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => dispatch(storeEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
