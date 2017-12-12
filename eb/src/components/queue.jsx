import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import styleVars from 'styles/variables';

const propTypes = {
  items: PropTypes.array.isRequired
};

class Queue extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: props.items
    };
  }

  render() {
    const StyledQueue = styled.div`
      border-radius: 3px;
      border: 1px solid ${styleVars.grayBorder};

      p.queue-heading {
        padding: 10px 100px;
        background-color: ${styleVars.lightGray};
        border-bottom: 1px solid ${styleVars.grayBorder};
        font-size: 1.3em;
        margin-bottom: 0;
      }
    `;

    return (
      <StyledQueue>
        <p className='queue-heading'>
          Song Queue
        </p>
        <div>
          {
            this.state.items.map(song => <QueueItem song={song} />)
          }
        </div>
      </StyledQueue>
    );
  }
}
Queue.propTypes = propTypes;

const QueueItem = (props) => {
  const StyledItem = styled.li`
    list-style-type: none;
    border-top: 1px solid ${styleVars.grayBorder};
    margin: 0;
    padding: 10px 5px;

    &:first-child {
      border-top: 0;
      color: ${styleVars.infoBlue};
    }
  `;

  return (
    <StyledItem>
      { props.song }
    </StyledItem>
  );
};
QueueItem.propTypes = {
  song: PropTypes.string
};

export default Queue;
