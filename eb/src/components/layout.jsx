import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = (props) => {
  const StyledHeader = styled.nav`
    width: 100%;
    padding: ${p => p.paddingVertical || '8px'} 0;
    margin-bottom: 0 !important;
    font-size: ${p => p.fontSize || '2.7em'};
    text-align: center;
    font-family: 'Bungee', cursive;
    background-color: ${p => p.backgroundColor || 'white'};
    color: ${p => p.fontColor || 'inherit'};
    border-radius: 0;

    a, a:hover {
      color: ${p => p.fontColor || 'inherit'};
    }
  `;

  return (
    <StyledHeader {...props} className={`${props.className || ''} has-text-centered`}>
      <Link to='/'>
        SoundLab
      </Link>
    </StyledHeader>
  );
};
Header.propTypes = {
  className: PropTypes.string,
  fontSize: PropTypes.string,
  fontColor: PropTypes.string
};

const Content = props => (
  <div className='content-wrap'>
    { props.children }
  </div>
);
Content.propTypes = {
  children: PropTypes.any
};

export {
  Header, Content
};
