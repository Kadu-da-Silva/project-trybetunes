import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      isChecked: false,
    };

    this.handleChecked = this.handleChecked.bind(this);
    this.favoriteSong = this.favoriteSong.bind(this);
  }

  componentDidMount() {
  }

  async handleChecked({ target }) {
    const value = target.checked;

    this.setState({
      isChecked: value,
    });
  }

  async favoriteSong() {
    const { isChecked } = this.state;
    const { music } = this.props;

    this.setState({ loading: true });

    if (!isChecked) {
      await addSong(music)
        .then(() => this.setState({ loading: false }));
    }
  }

  render() {
    const { music: { trackName, previewUrl, trackId } } = this.props;
    const { isChecked, loading } = this.state;
    return (
      <div>
        {loading ? <Loading />
          : (
            <div>
              <p>{trackName}</p>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
              </audio>
              <label htmlFor={ trackId }>
                Favorita
                <input
                  id={ trackId }
                  type="checkbox"
                  name="checked"
                  data-testid={ `checkbox-music-${trackId}` }
                  onChange={ this.handleChecked }
                  checked={ isChecked }
                  onClick={ this.favoriteSong }
                />
              </label>
            </div>
          )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number])).isRequired,
};

export default MusicCard;
