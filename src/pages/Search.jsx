import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    searchInputContent: '',
    isButtonDisabled: true,
  };

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

  render() {
    const { searchInputContent, isButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
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
        </form>
        <button
          data-testid="search-artist-button"
          disabled={ isButtonDisabled }
        >
          Pesquisar

        </button>
      </div>
    );
  }
}

export default Search;
