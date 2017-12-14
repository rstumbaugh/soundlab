import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import NowPlaying from 'components/now-playing.jsx';
import { Header, Content } from 'components/layout.jsx';
import Queue from 'components/queue.jsx';
import RequestForm from 'components/request-form.jsx';
import Notification from 'components/notification.jsx';
import socket from 'utils/socket';
import newId from 'utils/newid';
import styleVars from 'styles/variables';

const propTypes = {
  history: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  })
};

class Session extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sessionName: props.match.params.id,
      songs: [],
      requests: [],
      notifications: [],
      isDj: false
    };
  }

  componentDidMount() {
    // join session & init socket handlers
    if (!this.state.sessionName) {
      return;
    }

    axios.get(`/api/session/${this.state.sessionName}`)
      .then((response) => {
        const { songQueue, djId } = response.data;
        socket.emit('join session', this.state.sessionName);
        
        this.setState({
          songs: songQueue.map(x => JSON.parse(x)),
          isDj: socket.id === djId
        });
      })
      .catch(() => this.props.history.push('/'));

    socket.removeListener('new request');
    socket.removeListener('new song');
    socket.removeListener('sessionOver');

    socket.on('new request', (song) => {
      this.onNewTrack(JSON.parse(song), 'requests', 'New song request');
    });
    socket.on('new song', (song) => {
      this.onNewTrack(JSON.parse(song), 'songs', 'New song');
    });
    socket.on('session over', () => console.log('DJ has left. Session ended.'));
  }
  
  onNewTrack(song, stateAttr, notificationTitle) {
    let array = this.state[stateAttr];
    array.push(song);

    let { notifications } = this.state;
    notifications.push({
      id: newId('notif'),
      title: notificationTitle,
      message: song
    });

    let s = {
      notifications
    };
    s[stateAttr] = array;
    this.setState(s);
  }

  onSongRequest(song) {
    if (song) {
      socket.emit('add song', song);
    }
  }

  onNotificationClose(id) {
    let { notifications } = this.state;
    const idx = notifications.indexOf(e => e.id === id);
    notifications.splice(idx, 1);
    this.setState({ notifications });
  }

  onRequestAccept(song) {
    socket.emit('accept request', song);
    this.removeRequest(song.id);
  }

  onRequestReject(song) {
    this.removeRequest(song.id);
  }

  removeRequest(songId) {
    let { requests } = this.state;
    const idx = requests.indexOf(r => r.id === songId);
    requests.splice(idx, 1);
    this.setState({ requests });
  }

  render() {
    // can't use styled-components as wrapper
    // need to watch for "shouldComponentUpdate" in soundcloud widget
    const style = (
      <style>{`
        div.content {
          padding: 15px;
          background-color: ${styleVars.lightGray};
        }

        div.content h3 {
          font-weight: 600;
        }

        div.content p {
          font-weight: 300;
          color: ${styleVars.dark};
        }

        div.content .column:first-child {
          max-width: 434px;
        }
  
        .box.session-info h3,
        .box.session-info > div {
          display: inline-block;
          margin-right: 10px;
          margin-bottom: 0;
        }
  
        div.content .no-song {
          text-align: center;
        }
        div.content .no-song .icon-wrap {
          width: 100%;
          text-align: center;
          font-size: 5em;
          margin-bottom: 25px;
        }

        div.notifications {
          position: absolute;
          bottom: 15px;
          right: 15px;
        }
      `}
      </style>
    );
    return (
      <div>
        <Header 
          className='box'
          backgroundColor={styleVars.infoBlue}
          fontColor='white'
        />
        <Content>
          { style }
          <div className='content has-text-left'>
            <section className='columns'>
              <div className='column'>
                <div className='box session-info'>
                  <h3 id='sessionName'>
                    Session name: 
                  </h3>
                  <div>{ this.state.sessionName }</div>
                  <div className='button is-small is-info'>
                    Copy session link
                  </div>
                </div>
                <div className='box'>
                  <RequestForm 
                    onClick={this.onSongRequest}
                  />
                </div>
                {this.state.isDj ? (
                  <div className='box'>
                    <Queue
                      title='Request Queue'
                      items={this.state.requests}
                      maxHeight='150px'
                      showAcceptReject
                      onAccept={this.onRequestAccept.bind(this)}
                      onReject={this.onRequestReject.bind(this)}
                    />
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div className='column now-playing-column'>
                <div className='box'>
                  <NowPlaying songs={this.state.songs} />
                </div>
              </div>
              <div className='column queue-column'>
                <div className='box'>
                  <Queue 
                    title='Song Queue'
                    items={this.state.songs} 
                    maxHeight='250px'
                    highlightFirst
                  />
                  <br />
                  <p>
                    To add a song to the queue, just request a track. If 
                    the DJ accepts your request, it will show up in the queue.
                  </p>
                </div>
              </div>  
            </section>
            <div className='notifications'>
              {
                this.state.notifications.map(n => (
                  <Notification 
                    {...n} 
                    key={n.id}
                    onClose={this.onNotificationClose.bind(this)}
                  />
                ))
              }
            </div>
          </div>
        </Content>
      </div>
    );
  }
}

Session.propTypes = propTypes;

export default Session;
