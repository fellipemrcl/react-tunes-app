import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { songs } = this.props;
    return (
      songs.map(({ previewUrl, trackName }, index) => (
        <div key={ index }>
          <p>{trackName}</p>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
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
