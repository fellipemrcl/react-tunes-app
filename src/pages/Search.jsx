import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import '../styles/Search.css';

class Search extends Component {
  state = {
    searchInputContent: '',
    isButtonDisabled: true,
    isLoading: false,
    artistName: '',
    albums: [],
  };

  componentDidMount() {
    // this.handleClick();
  }

  searchInputValidation = () => {
    const { searchInputContent } = this.state;
    const MIN_LENGTH = 2;
    const validInput = searchInputContent.length >= MIN_LENGTH;
    this.setState({
      isButtonDisabled: !validInput,
    });
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.searchInputValidation);
  };

  handleClick = async () => {
    this.setState({
      isLoading: true,
      searchInputContent: '',
    });
    const { searchInputContent } = this.state;
    const request = await searchAlbumsAPI(searchInputContent);
    this.setState({
      isLoading: false,
      artistName: searchInputContent,
      albums: [...request],
    });
  };

  render() {
    const {
      searchInputContent,
      isButtonDisabled,
      isLoading,
      artistName,
      albums } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          {isLoading ? <Loading /> : (
            <>
              <label htmlFor="Search__Input">
                <input
                  data-testid="search-artist-input"
                  type="text"
                  name="searchInputContent"
                  id="Search__Input"
                  value={ searchInputContent }
                  onChange={ this.onInputChange }
                />
              </label>
              <button
                data-testid="search-artist-button"
                disabled={ isButtonDisabled }
                onClick={ this.handleClick }
              >
                Pesquisar

              </button>
              <div>
                <h2>
                  Resultado de álbuns de:
                  {' '}
                  {artistName}
                </h2>
              </div>
              <div className="Albums__Container">
                { albums.length > 0 ? albums.map((album, index) => (
                  <div key={ index } className="Album__Container">
                    <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                    <h3>{album.artistName}</h3>
                    <p>{album.collectionName}</p>
                    <Link
                      key={ album.collectionId }
                      to={ `/album/${album.collectionId}` }
                      data-testid={ `link-to-album-${album.collectionId}` }
                    >
                      Ver

                    </Link>
                  </div>
                )) : (<p>Nenhum álbum foi encontrado</p>)}
              </div>
            </>
          )}
        </form>
      </div>
    );
  }
}

export default Search;
