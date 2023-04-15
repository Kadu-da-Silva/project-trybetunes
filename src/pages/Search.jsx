import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      nameArtist: '',
      buttonDisable: true,
      loading: false,
      resultSearch: false,
      albums: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.resultSearch = this.resultSearch.bind(this);
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

  handleButtonClick(event) {
    event.preventDefault();

    const { name } = this.state;

    searchAlbumsAPI(name)
      .then((date) => {
        this.setState({
          loading: true,
          resultSearch: true,
          nameArtist: name,
          albums: date,
          name: '',
        });
      });
  }

  resultSearch() {
    const { albums, nameArtist } = this.state;

    if (albums.length !== 0) {
      return (
        <>
          <h1>{`Resultado de álbuns de: ${nameArtist}`}</h1>
          {albums.map((obj) => (
            <Link
              key={ obj.collectionId }
              data-testid={ `link-to-album-${obj.collectionId}` }
              to={ `/album/${obj.collectionId}` }
            >
              <div>
                <img src={ obj.artworkUrl100 } alt="" />
                <p>{`${obj.artistName}`}</p>
                <p>{`${obj.collectionName}`}</p>
                <p>{`${obj.collectionPrice}`}</p>
                <p>{`${obj.releaseDate}`}</p>
                <p>{`${obj.trackCount} músicas` }</p>
              </div>
            </Link>
          ))}
        </>
      );
    }
    return <p>Nenhum álbum foi encontrado</p>;
  }

  render() {
    const { name, buttonDisable, loading, resultSearch } = this.state;
    if (loading === true) {
      <Loading />;
    }
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
              onClick={ this.handleButtonClick }
            >
              Pesquisar
            </button>
          </fieldset>
        </form>

        {resultSearch ? this.resultSearch() : undefined}

      </div>
    );
  }
}

export default Search;
