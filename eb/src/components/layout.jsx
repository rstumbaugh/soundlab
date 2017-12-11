import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = (props) => {
  const StyledHeader = styled.div`
    width: 100%;
    padding: ${p => p.paddingVertical || '8px'} 0;
    font-size: ${p => p.fontSize};
    text-align: center;
    font-family: 'Bungee', cursive
  `;

  return (
    <StyledHeader {...props}>
      <Link to='/' style={{ color: props.fontColor || 'black' }}>
        SoundLab
      </Link>
    </StyledHeader>
  );
};
Header.propTypes = {
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

const Footer = () => (
  <div className='footer' />
);

export {
  Header, Content, Footer
};
