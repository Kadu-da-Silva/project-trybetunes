import React from 'react';
import Header from '../Components/Header';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      buttonDisable: true,
      // loading: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;

    if (value.length > 1) {
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

  render() {
    const { name, buttonDisable } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <fieldset>
            <legend>Search Albums and Artists</legend>
            <label htmlFor="name">
              <input
                type="text"
                id="name"
                name="name"
                data-testid="search-artist-input"
                onChange={ this.handleChange }
                value={ name }
              />
            </label>
            <button
              id="btnSearch"
              data-testid="search-artist-button"
              disabled={ buttonDisable }
            >
              Pesquisar
            </button>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default Search;
