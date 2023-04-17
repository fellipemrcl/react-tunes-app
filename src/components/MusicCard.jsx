import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    isLoading: false,
    favoriteSongs: [],
  };

  componentDidMount() {
    this.fetchFavoriteSongs();
  }

  handleFavorite = async (event, songs) => {
    const { checked } = event.target;
    this.setState({ isLoading: true });
    if (checked) {
      await addSong(songs);
      await this.fetchFavoriteSongs();
      this.setState({ isLoading: false });
    } else {
      await removeSong(songs);
      await this.fetchFavoriteSongs();
      this.setState({ isLoading: false });
    }
  };

  fetchFavoriteSongs = async () => {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ favoriteSongs });
  };

  render() {
    const { songs } = this.props;
    const { isLoading, favoriteSongs } = this.state;

    if (isLoading) {
      return <Loading />;
    }

    return (
      songs.map((album, index) => (
        <div key={ index }>
          <p>{album.trackName}</p>
          <audio data-testid="audio-component" src={ album.previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
          <label
            data-testid={ `checkbox-music-${album.trackId}` }
            htmlFor={ album.trackId }
          >
            Favorita
            <input
              type="checkbox"
              name={ `checkbox-music-${album.trackId}` }
              id={ album.trackId }
              checked={ favoriteSongs.some((song) => song.trackId === album.trackId) }
              onChange={ (event) => this.handleFavorite(event, album) }
            />
          </label>
        </div>
      ))
    );
  }
}

MusicCard.propTypes = {
  songs: PropTypes.arrayOf(
    PropTypes.shape({
      previewUrl: PropTypes.string,
      trackName: PropTypes.string,
    }),
  ).isRequired,
};

export default MusicCard;
