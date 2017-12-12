import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
import SoundCloud from 'components/soundcloud.jsx';
import { Header, Content, Footer } from 'components/layout.jsx';
import Queue from 'components/queue.jsx';
import RequestForm from 'components/request-form.jsx';
import socket from 'utils/socket';
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
      messages: [],
      songs: ['12345', '67890', '23455']
    };
  }

  componentDidMount() {
    // join session & init socket handlers
    if (!this.state.sessionName) {
      return;
    }

    axios.get(`/api/session/${this.state.sessionName}`)
      .then((response) => {
        socket.emit('join session', this.state.sessionName);
        console.log(response.data);
      })
      .catch(() => this.props.history.push('/'));

    const addMessage = (message) => {
      let { messages } = this.state;
      messages.push(message);
      this.setState({ messages });
    };

    socket.on('joined', addMessage);
    socket.on('new client', addMessage);
    socket.on('new request', addMessage);
    socket.on('new song', addMessage);
    socket.on('session over', () => addMessage('DJ has left. Session ended.'));
  }

  handleClick() {
    socket.emit('add song', '341972528');
  }

  render() {
    const StyledContent = styled.div`
      padding: 15px;
      position: relative;
      background-color: ${styleVars.lightGray};

      h3 {
        font-weight: 600;
      }

      p {
        font-weight: 300;
        color: ${styleVars.dark};
      }

      .box.session-info h3,
      .box.session-info > div {
        display: inline-block;
        margin-right: 10px;
        margin-bottom: 0;
      }
    `;
    return (
      <div>
        <Header 
          className='box'
          backgroundColor={styleVars.infoBlue}
          fontColor='white'
        />
        <Content>
          <StyledContent className='content has-text-left'>
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
                  <RequestForm />
                </div>
              </div>
              <div className='column now-playing-column'>
                <div className='box'>
                  <h2>Now Playing</h2>
                  <SoundCloud 
                    trackId='322834362' 
                    onFinish={() => console.log('done')} 
                    width='500px'
                  />
                </div>
              </div>
              <div className='column queue-column'>
                <div className='box'>
                  <Queue 
                    title='Song Queue'
                    items={this.state.songs} 
                  />
                </div>
              </div>  
            </section>
          </StyledContent>
        </Content>
        <Footer />
      </div>
    );
  }
}

Session.propTypes = propTypes;

export default Session;
