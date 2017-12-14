import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import styleVars from 'styles/variables';
import newId from 'utils/newid';

const propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  maxHeight: PropTypes.string,
  minHeight: PropTypes.string,
  highlightFirst: PropTypes.bool,
  showAcceptReject: PropTypes.bool,
  onAccept: PropTypes.func,
  onReject: PropTypes.func
};

const Queue = (props) => {
  const StyledQueue = styled.div`
    .queue-item-wrap {
      max-height: ${p => p.maxHeight || 'none'};
      min-height: ${p => p.minHeight || 0};
      overflow-y: auto;
    }
  `;

  return (
    <StyledQueue 
      maxHeight={props.maxHeight} 
      minHeight={props.minHeight}
    >
      <h3>{ props.title }</h3>
      <div className='queue-item-wrap'>
        {props.items.length > 0 ? (
          props.items.map(song => (
            <QueueItem 
              key={newId('qItem')}
              song={song} 
              highlightFirst={props.highlightFirst}
              showAcceptReject={props.showAcceptReject}
              onAccept={props.showAcceptReject ? props.onAccept : undefined}
              onReject={props.showAcceptReject ? props.onReject : undefined}
            />
          ))
        ) : (
          <div className='empty-queue'>
            <span className='icon'>
              <i className='fa fa-music' />
            </span>
            <i> No songs in the queue</i>
          </div>
        )}
      </div>
    </StyledQueue>
  );
};
Queue.propTypes = propTypes;

const QueueItem = (props) => {
  const StyledItem = styled.li`
    list-style-type: none;
    border-top: 1px solid ${styleVars.grayBorder};
    padding: ${p => p.showAcceptReject ? '10px 60px 10px 5px' : '10px 5px'};
    position: relative;
    word-wrap: break-word;
    color: ${styleVars.dark};
    cursor: pointer;

    &:first-child {
      border-top: 0;
      color: ${p => p.highlightFirst ? styleVars.infoBlue : 'inherit'};

      & a, & a:hover {
        color: ${p => p.highlightFirst ? styleVars.infoBlue : 'inherit'};
      }
    }

    a, a:hover {
      color: ${styleVars.dark};
    }

    .icon-wrap {
      position: absolute;
      top: 10px;
      right: 5px;

      .fa:hover {
        cursor: pointer;
      }

      .fa-check {
        color: ${styleVars.green};
      }

      .fa-close {
        color: ${styleVars.red};
      }
    }
  `;

  return (
    <StyledItem {...props}>
      <a href={props.song.url} target='_blank'>
        { `${props.song.artist} - ${props.song.title}` }
      </a>
      {props.showAcceptReject ? (
        <div className='icon-wrap'>
          <span 
            className='icon' 
            onClick={() => props.showAcceptReject ? props.onAccept(props.song) : false}
          >
            <i className='fa fa-check' />
          </span>
          <span 
            className='icon' 
            onClick={() => props.showAcceptReject ? props.onReject(props.song) : false}
          >
            <i className='fa fa-close' />
          </span>
        </div>
      ) : (
        ''
      )}
    </StyledItem>
  );
};
QueueItem.propTypes = {
  song: PropTypes.object.isRequired,
  showAcceptReject: PropTypes.bool,
  highlightFirst: PropTypes.bool,
  onAccept: PropTypes.func,
  onReject: PropTypes.func
};

export default Queue;
