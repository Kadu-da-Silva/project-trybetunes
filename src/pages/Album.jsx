import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../Components/Loading';
import MusicCard from '../Components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musics: [],
      loading: true,
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    getMusics(id)
      .then((tracks) => {
        this.setState({
          musics: tracks,
          loading: false,
        });
      });
  }

  render() {
    const { musics, loading } = this.state;

    if (loading || musics.length === 0) return <Loading />;
    return (
      <div data-testid="page-album">
        <Header />
        <h1>Álbum</h1>
        <div>
          <div>
            <img src={ musics[0].artworkUrl100 } alt="" />
            <p data-testid="artist-name">{`${musics[0].artistName}`}</p>
            <p data-testid="album-name">{`${musics[0].collectionName}`}</p>
            <p>{`${musics[0].releaseDate}`}</p>
          </div>
          <div>
            <h2>Músicas</h2>
            {musics.slice(1).map((track) => (
              <MusicCard
                key={ track.trackId }
                music={ track }
              />
            ))}
          </div>
        </div>
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
