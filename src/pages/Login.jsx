import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../Components/Loading';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      buttonDisable: true,
      loading: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;

    if (value.length > 2) {
      this.setState({
        [name]: value,
        buttonDisable: false,
      });
    } else {
      this.setState({
        [name]: value,
        buttonDisable: true,
      });
    }
  }

  handleButtonClick(event) {
    event.preventDefault();

    this.setState({
      loading: true,
    });

    const { name } = this.state;
    const { history: { push } } = this.props;

    createUser({ name }).then(() => {
      push('/search');
    });
  }

  render() {
    const { name, buttonDisable, loading } = this.state;

    return (
      <div data-testid="page-login">
        {loading
          ? <Loading />
          : (
            <form>
              <fieldset>
                <legend>Login</legend>
                <label htmlFor="name">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Digite seu nome"
                    data-testid="login-name-input"
                    onChange={ this.handleChange }
                    value={ name }
                  />
                </label>
                <button
                  id="btnLogin"
                  data-testid="login-submit-button"
                  disabled={ buttonDisable }
                  onClick={ this.handleButtonClick }
                >
                  Entrar
                </button>
              </fieldset>
            </form>
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
