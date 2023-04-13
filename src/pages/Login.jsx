import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  state = {
    name: '',
    isButtonDisabled: true,
    isLoading: false,
  };

  nameInputValidation = () => {
    const { name } = this.state;
    const MIN_LENGTH = 3;
    const validInput = name.length >= MIN_LENGTH;
    this.setState({
      isButtonDisabled: !validInput,
    });
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.nameInputValidation);
  };

  onLogin = async () => {
    this.setState({
      isLoading: true,
    });
    const { name } = this.state;
    const { history } = this.props;
    const user = {
      name,
    };
    await createUser(user);
    this.setState({
      isLoading: false,
    });
    history.push('/search');
  };

  render() {
    const { name, isButtonDisabled, isLoading } = this.state;
    return (
      <div data-testid="page-login">
        {isLoading ? <Loading /> : (
          <>
            <label htmlFor="name">
              <input
                data-testid="login-name-input"
                type="text"
                name="name"
                id="name"
                value={ name }
                onChange={ this.onInputChange }
              />
            </label>
            <button
              onClick={ this.onLogin }
              type="button"
              data-testid="login-submit-button"
              disabled={ isButtonDisabled }
            >
              Entrar

            </button>

          </>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
