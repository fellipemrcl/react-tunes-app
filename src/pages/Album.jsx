import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    artistName: '',
    albumName: '',
    songs: [],
  };

  componentDidMount() {
    this.filterInfo();
  }

  filterInfo = async () => {
    const { match: { params: { id } } } = this.props;
    const albumsAndSongs = await getMusics(id);
    const songs = albumsAndSongs.filter((song) => song.wrapperType === 'track');
    this.setState({
      artistName: songs[0].artistName,
      albumName: songs[0].collectionName,
      songs: [...songs],
    });
  };

  render() {
    const { artistName, albumName, songs } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <h2 data-testid="artist-name">{artistName}</h2>
          <h3 data-testid="album-name">{albumName}</h3>
        </div>
        <MusicCard songs={ songs } />
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
