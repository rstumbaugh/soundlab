import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import styleVars from 'styles/variables';

const Notification = (props) => {
  const onClose = () => {
    const ele = document.getElementById(props.id);
    ele.classList += ' hidden';

    setTimeout(() => {
      props.onClose(props.id);
    }, 600);
  };

  setTimeout(() => {
    onClose();
  }, 2000);

  const StyledNotification = styled.div`
    margin-top: 10px;
    opacity: 1;
    transition: opacity 0.5s ease-in;
    width: 300px;
    
    &.hidden {
      opacity: 0;
      transition: opacity: 0.5s ease-out;
    }

    h4 {
      color: ${styleVars.infoBlue};
      padding-right: 25px;

      .icon {
        margin-right: 5px;
      }
    }

    .box {
      position: relative;

      .close {
        position: absolute;
        top: 5px;
        right: 5px;
        color: #B5B5B2;

        &:hover {
          cursor: pointer;
        }
      }
    }
  `;
  return (
    <StyledNotification id={props.id}>
      <div className='box'>
        <h4>
          <span className='icon'><i className='fa fa-bell' /></span>
          { props.title }
        </h4>
        { `${props.message.artist} - ${props.message.title}` }
        <div className='close' onClick={onClose}>
          <span className='icon'><i className='fa fa-close' /></span>
        </div>
      </div>
    </StyledNotification>
  );
};
Notification.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.object.isRequired
};

export default Notification;
