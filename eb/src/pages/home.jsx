import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  history: PropTypes.object
};

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sessionName: ''
    };
  }

  handleChange(e) {
    this.setState({ sessionName: e.target.value });
  }

  joinSession() {
    this.props.history.push(`/session/${this.state.sessionName}`);
  }

  render() {
    return (
      <div>
        <h1>SoundLab</h1>
        <label htmlFor='session'>Enter session name</label>
        <br />
        <input
          id='session'
          type='text'
          value={this.state.sessionName}
          onChange={this.handleChange.bind(this)}
        />
        <button onClick={this.joinSession.bind(this)}>Submit</button>
        <br />
      </div>
    );
  }
}

Home.propTypes = propTypes;

export default Home;
