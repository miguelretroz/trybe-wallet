import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      total: 0,
    };
  }

  render() {
    const { total } = this.state;
    const { userEmail } = this.props;
    return (
      <div>
        <header>
          <span data-testid="email-field">
            { `Email: ${userEmail}` }
          </span>
          <span data-testid="total-field">
            { `Despesa Total: ${total}` }
          </span>
          <span data-testid="header-currency-field">
            BRL
          </span>
        </header>
      </div>
    );
  }
}

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

export default connect(mapStateToProps)(Wallet);
