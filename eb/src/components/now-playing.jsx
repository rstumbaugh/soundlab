import React from 'react';
import PropTypes from 'prop-types';
import SoundCloud from './soundcloud.jsx';

const NowPlaying = props => (
  <div>
    <h3>Now Playing</h3>
    {props.songs.length > 0 ? (
      <SoundCloud 
        trackId={props.songs[0].id} 
        onFinish={() => console.log('done')} 
        width='500px'
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
  songs: PropTypes.array.isRequired
};

export default NowPlaying;
