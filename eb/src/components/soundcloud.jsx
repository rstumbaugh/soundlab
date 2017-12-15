import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SoundcloudAudio from 'soundcloud-audio';
import styleVars from 'styles/variables';

const clientId = 'yz7hDTb7GMHkmzo3CrZKSyvIwXaPF7wL';
const propTypes = {
  song: PropTypes.object.isRequired,
  onFinish: PropTypes.func.isRequired,
  width: PropTypes.string
};

class SoundCloud extends React.Component {
  constructor() {
    super();

    this.state = {
      progress: 0
    };
  }

  componentDidMount() {
    this.player = new SoundcloudAudio(clientId);
    this.player.play({
      streamUrl: this.props.song.stream
    });
    this.player.on('timeupdate', () => {
      const progress = this.player.audio.currentTime / this.props.song.duration;
      this.setState({ progress });
    });
  }

  render() {
    const Player = styled.div`
      width: ${props => props.width}px;
      height: ${props => props.height};
      background-image: url(${props => props.song.albumArt});

      .track-info {
        height: 100%;
        width: 100%;
        background-color: #f5f5f559;
        padding-top: 75px;
        text-align: center;
        color: white;
        position: relative;

        h4 {
          color: inherit;
          font-size: 2.5em;
          font-weight: 700;
          margin-bottom: 0;
        }

        hr {
          width: 25%;
          margin: 15px auto;
        }

        p {
          color: inherit;
          font-style: italic;
        }

        .progress-wrap {
          position: absolute;
          bottom: 0;
          width: ${props => props.width}px;
          background-color: white;
          height: ${props => props.progressHeight};

          .progress-bar {
            height: ${props => props.progressHeight};
            background-color: ${styleVars.infoBlue};
            width: ${props => props.width * props.progress}px;
          }
        }
      }
    `;
    
    return (
      <Player 
        {...this.props} 
        progress={this.state.progress}
        progressHeight='10px'
      >
        <div className='track-info'>
          <h4>{ this.props.song.title }</h4>
          <hr />
          <p>{ this.props.song.artist }</p>
          <div className='progress-wrap'>
            <div className='progress-bar' />
          </div>
        </div>
      </Player>
    );
  }
}

SoundCloud.propTypes = propTypes;

export default SoundCloud;
