import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Header, Content } from 'components/layout.jsx';
import socket from 'utils/socket';
import styleVars from 'styles/variables';

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

  createSession() {
    // can't do via AJAX, need to tie socket ID to new session
    socket.emit('create session');
    socket.on('session created', (sessionName) => {
      this.props.history.push(`/session/${sessionName}`);
    });
  }

  joinSession() {
    this.props.history.push(`/session/${this.state.sessionName}`);
  }

  render() {
    const StyledContent = styled.div`
      margin-top: -100px;
    `;

    const StyledCard = styled.div`
      display: inline-block;
    `;

    const StyledCardFooter = styled.div`
      background-color: white;

      &:hover {
        cursor: pointer;
        background-color: #e8e8e8;
      }
    `;

    return (
      <div>
        <Content padding='0'>
          <section className='hero is-fullheight is-info'>
            <div className='hero-head'>
              <Header
                backgroundColor={styleVars.infoBlue}
                fontColor='white'
              />
            </div>
            <StyledContent className='hero-body has-text-centered'>
              <div className='container'>
                <StyledCard className='card'>
                  <header className='card-header'>
                    <p className='card-header-title'>
                      Welcome to SoundLab!
                    </p>
                  </header>
                  <div className='card-content has-text-left'>
                    <div className='field'>
                      <label className='label' htmlFor='session'>
                        Join a session
                      </label>
                    </div>
                    <input
                      className='input'
                      id='session'
                      type='text'
                      value={this.state.sessionName}
                      onChange={this.handleChange.bind(this)}
                    />
                    <button
                      className='button'
                      style={{ marginTop: '10px' }}
                      onClick={this.joinSession.bind(this)}
                    >
                      Submit
                    </button>
                  </div>
                  <footer className='card-footer'>
                    <StyledCardFooter
                      className='card-footer-item has-text-dark'
                      onClick={this.createSession.bind(this)}
                    >
                      Create a new session
                    </StyledCardFooter>
                  </footer>
                </StyledCard>
              </div>
            </StyledContent>
          </section>
        </Content>
      </div>
    );
  }
}

Home.propTypes = propTypes;

export default Home;
