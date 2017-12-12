import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import styleVars from 'styles/variables';

class RequestForm extends React.Component {
  constructor() {
    super();

    this.state = {
      song: ''
    };
  }

  handleChange(e) {
    this.setState({ song: e.target.value });
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
    `;

    return (
      <StyledDiv>
        <h3>Request a track</h3>
        <div className='field'>
          <label className='label' htmlFor='song'>
            Enter a SoundCloud URL
          </label>
          <input id='song' type='text' className='input' />
          <button className='button is-small is-info'>
            Submit
          </button>
        </div>
      </StyledDiv>
    );
  }
}

export default RequestForm;
