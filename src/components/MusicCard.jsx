import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    checkedMap: {},
    isLoading: false,
  };

  handleCheckbox = async ({ target: { id, checked } }) => {
    this.setState({
      isLoading: true,
    });

    this.setState((prevState) => ({
      checkedMap: {
        ...prevState.checkedMap,
        [id]: checked,
      },
    }));

    if (checked) {
      await addSong(id);
    }

    this.setState({
      isLoading: false,
    });
  };

  render() {
    const { songs } = this.props;
    const { checkedMap, isLoading } = this.state;

    if (isLoading) {
      return <Loading />;
    }

    return (
      songs.map(({ previewUrl, trackName, trackId }, index) => (
        <div key={ index }>
          <p>{trackName}</p>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
          <label data-testid={ `checkbox-music-${trackId}` } htmlFor={ trackId }>
            Favorita
            <input
              type="checkbox"
              name={ `checkbox-music-${trackId}` }
              id={ trackId }
              checked={ checkedMap[trackId] || false } // Usa o estado guardado para o ID, ou false se não existir
              onChange={ this.handleCheckbox }
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
