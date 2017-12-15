import React from 'react';
import PropTypes from 'prop-types';
import SoundCloud from './soundcloud.jsx';

const NowPlaying = props => (
  <div>
    <h3>Now Playing</h3>
    {props.songs.length > 0 ? (
      <SoundCloud 
        song={props.songs[0]} 
        onFinish={props.onSongFinish} 
        width='500'
        height='300px'
      />
    ) : (
      <div className='no-song'>
        <div className='icon-wrap'>
          <i className='fa fa-music' />
        </div>
        <i>Request a song to get started</i>
      </div>
    )}
  </div>
);

NowPlaying.propTypes = {
  songs: PropTypes.array.isRequired,
  onSongFinish: PropTypes.func.isRequired
};

export default NowPlaying;
