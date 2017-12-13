import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import styleVars from 'styles/variables';

const propTypes = {
  onClick: PropTypes.func.isRequired
};

class RequestForm extends React.Component {
  onClick() {
    const ele = document.getElementById('song');
    this.props.onClick(ele.value);
    ele.value = '';

    const text = document.getElementById('help');
    text.className = text.className.replace(' hidden', '');
    setTimeout(() => {
      text.className += ' hidden';
    }, 2000);
  }

  render() {
    const StyledDiv = styled.div`
      label {
        font-weight: 300;
        color: ${styleVars.dark};
      }

      button {
        margin-top: 10px;
      }

      .help {
        display: inline-block;
        margin-top: 15px;
        margin-left: 5px;
        opacity: 1;
        transition: opacity 0.25s ease-in;

        &.hidden {
          opacity: 0;
          transition: opacity 0.25s ease-out;
        }
      }
    `;
    
    return (
      <StyledDiv>
        <h3>Request a track</h3>
        <div className='field'>
          <label className='label' htmlFor='song'>
            Enter a SoundCloud URL
          </label>
          <input 
            id='song' 
            type='text' 
            className='input' 
          />
          <button className='button is-small is-info' onClick={this.onClick.bind(this)}>
            Submit
          </button>
          <span id='help' className='help is-success hidden'>
            Song requested!
          </span>
        </div>
      </StyledDiv>
    );
  }
}
RequestForm.propTypes = propTypes;

export default RequestForm;
