import React from 'react';
import PropTypes from 'prop-types';
import SoundCloud from 'components/soundcloud.jsx';
import socket from 'utils/socket';

const propTypes = {
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
      messages: []
    };
  }

  componentDidMount() {
    // join session & init socket handlers
    if (!this.state.sessionName) {
      return;
    }

    socket.emit('join session', this.state.sessionName);

    const addMessage = (message) => {
      let { messages } = this.state;
      messages.push(message);
      this.setState({ messages });
    };

    socket.on('joined', addMessage);
    socket.on('new client', addMessage);
    socket.on('session over', addMessage);
  }

  handleClick() {
    socket.emit('add song', '341972528');
  }

  render() {
    return (
      <div>
        <h1>SoundLab</h1>
        <p>{ `Session name: ${this.state.sessionName} ` }</p>
        <h3>Messages</h3>
        <div>
          { this.state.messages.map((msg, i) => <p key={i}>{ msg }</p>) }
        </div>
        <button onClick={this.handleClick}>Add song</button>
      </div>
    );
  }
}

Session.propTypes = propTypes;

export default Session;
